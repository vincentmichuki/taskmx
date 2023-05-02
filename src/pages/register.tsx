import { Fragment, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { persistUserData } from "@/src/utils/utils";
import { RegisterForm } from "../types/types";
import { BASE_URL } from "@/src/utils/constants";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [wrongCredials, setWrongCredentials] = useState(false);

  const router = useRouter()

  const handleSignUp = async (e: FormEvent<RegisterForm>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setWrongCredentials(false);

      // Get data from the form.
      const form = e.currentTarget.elements;

      const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      }

      console.log(data);

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.

      const response = await fetch(`${BASE_URL}register/`, {
        method: 'POST',
        body: JSONdata,
        headers: {
          "Content-Type": "application/json",
        }
      });
      setLoading(false);

      // Get the response data from server as JSON.
      const result = await response.json();

      persistUserData(result);
      // navigate to dashboard
      router.push(`/dashboard`)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Please wait ...' : 'Sign in'}
              </button>
            </div>
            {
              wrongCredials &&
              <p className="text-[red] text-sm">Invalid email or password. Try again</p>
            }
          </form>
        </div>
      </div>
    </Fragment>
  )
}
