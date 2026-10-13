import { UserSchema } from '#/lib/schemas';
import type { CreateUserInput, UserType } from '#/lib/types/user.type';
import { createUserFn, getUsersFn } from '#/server/users/users.function';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/users/')({
  loader: async (): Promise<{ users: UserType[] }> => {
    const users = await getUsersFn();
    return { users };
  },
  component: RouteUserComponent,
  notFoundComponent: () => <div>Component Not Found</div>,
});

function RouteUserComponent() {
  const { users } = Route.useLoaderData();
  const [userList, setUserList] = useState(users);

  const [valErrors, setValErrors] = useState({
    email: '',
    username: '',
    role: '',
    name: '',
    password: '',
  });

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);

    const userdata: CreateUserInput = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      role: formData.get('role') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    };
    console.log(userdata);

    const zodValidate = UserSchema.safeParse(userdata);
    if (!zodValidate.success) {
      //console.log('zod error');
      //console.log(zodValidate.error.issues);
      let errmsgs: any = {
        email: '',
        username: '',
        role: '',
        name: '',
        password: '',
      };
      zodValidate.error.issues.forEach((issue, index) => {
        const key = Object.keys(issue);
        const path = issue['path'][0].toString();
        const message = issue['message'];
        console.log(`${path}: ${message}`);
        errmsgs[path] = message;
        console.log(errmsgs);
        setValErrors(errmsgs);
      });

      return;
    }
    try {
      const submit = await createUserFn({ data: userdata });
      if (submit.success) {
        setValErrors({
          email: '',
          username: '',
          role: '',
          name: '',
          password: '',
        });
        setUserList((prev) => [...prev, submit.new_user]);
        event.target.reset();
      } else {
      }
    } catch (validationErr: any) {
      // here the error is no longer instance of ZodError due to serialization!!
      console.log('My errors are:', validationErr);
    }
  };

  return (
    <div>
      User Page
      <table>
        <thead>
          <tr>
            <th className="w-[40px] border text-center">Id</th>
            <th className="w-[200px] border text-center">Username</th>
            <th className="w-[300px] border text-center">Email</th>
            <th className="w-[200px] border text-center">Name</th>
            <th className="w-[150px] border text-center">Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr className="py-5 border" key={user.id}>
              <td className="text-center">{user.id}</td>
              <td className="text-center">{user.username}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">{user.name}</td>
              <td className="text-center">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form
        className="w-[90vw] md:w-[400px] my-5 p-5 border"
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="email" className="w-1/3">
            E-mail
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            required
          />
        </div>
        {valErrors.email && <p>{valErrors.email}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="username" className="w-1/3">
            Username
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="text"
            id="username"
            name="username"
            placeholder="User name"
            required
          />
        </div>
        {valErrors.username && <p>{valErrors.username}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="name" className="w-1/3">
            Name
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
          />
        </div>
        {valErrors.name && <p>{valErrors.name}</p>}
        <div className="w-[90vw] my-2 md:w-[300px] flex">
          <label htmlFor="password" className="w-1/3">
            Password
          </label>
          <input
            className="w-2/3 border p-1 rounded-md bg-gray-950"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {valErrors.password && <p>{valErrors.password}</p>}
        <input type="hidden" id="role" name="role" value="user" required />
        <button
          type="submit"
          className="relative w-50 h-10 bg-[#43a8c8] text-white rounded-full flex justify-center items-center cursor-pointer"
        >
          <span className="text-lg">Add User</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="-20 -20 40 40"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute lucide lucide-plus preview-icon inline right-2"
          >
            <circle cx="0" cy="0" r="12" stroke="#eeeeee" strokeWidth={2} />
            <path d="M0 -8 v16" />
            <path d="M-8 0 h16" />
          </svg>
        </button>
      </form>
    </div>
  );
}
