import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { persistUserData } from "@/utils/utils";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [wrongCredials, setWrongCredentials] = useState(false);

    const router = useRouter()

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            setWrongCredentials(false);
            // Get data from the form.
            const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
            };
            const data = {
                username: target.email.value,
                password: target.password.value,
            }

            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)

            // API endpoint where we send form data.

            const response = await axios.post('/login', { data: data});
            setLoading(false);
            console.log(response)

            // Get the response data from server as JSON.
            const result = await response.data;
            console.log(result);
            if (JSON.stringify(result).includes('Incorrect credentials')) {
                setWrongCredentials(true);
            } else {
                persistUserData(result);
                // navigate to dashboard
                router.push(`/dashboard`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
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
                            <p className="text-[red] text-sm">Invalid email or password</p>
                        }
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
