

import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { CreateTicketForm } from '../types/types';
import { BASE_URL } from '../utils/constants';
import { useUser } from '../hooks/hooks';

export default function CreateTicketModal({ setOpen, addTicket }: { setOpen: Function, addTicket: Function }) {

    const [loading, setLoading] = useState(false);
    const user = useUser('login/');

    const createTicket = async (e: FormEvent<CreateTicketForm>) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Get data from the form.
            const form = e.currentTarget.elements;

            const data = {
                title: form.title.value,
                description: form.description.value,
                assigned_user: user?.userid,
                user: form.user.value,
                ticket_type: form.ticket_type.value
            }

            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)

            const response = await fetch(`${BASE_URL}tickets/`, {
                method: 'POST',
                body: JSONdata,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setLoading(false);

            // Get the response data from server as JSON.
            const result = await response.json();

            addTicket({
                id: result['id'],
                title: result['title'],
                description: result['description'],
                status: result['status'],
                ticket_type: result['ticket_type'],
                created: result['created'],
                assigned_user: result['assigned_user']
            });

            setOpen(false);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <PencilIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Create a new ticket
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Fill in the details to create a new ticket
                                        </p>
                                    </div>

                                    <form className="space-y-6" onSubmit={createTicket}>
                                        <input type="hidden" value={user?.userid.toString()} name='assigned_user' />
                                        <input type="hidden" value={user?.userid.toString()} name='user' />
                                        <div className='flex flex-col items-start mt-4'>
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2 w-full">
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    autoComplete="title"
                                                    required
                                                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-start mt-4'>
                                            <label htmlFor="ticket_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                Ticket type
                                            </label>
                                            <div className="mt-2 w-full">
                                                <select name="ticket_type" id="ticket_type" defaultValue='inquiry' className='block border w-full px-4 rounded-md py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6'>
                                                    <option value="inquiry">Inquiry</option>
                                                    <option value="product support">Product support</option>
                                                    <option value="complaint">Complaint</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-start'>
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                Description
                                            </label>
                                            <div className="mt-2 w-full">
                                                <textarea
                                                    rows={4}
                                                    name="description"
                                                    id="description"
                                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                                            >
                                                {loading ? 'Please wait ...' : 'Create Ticket'}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Fragment>
    )
}
