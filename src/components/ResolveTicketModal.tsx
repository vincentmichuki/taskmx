

import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { CreateTicketForm, Ticket } from '../types/types';
import { BASE_URL } from '../utils/constants';
import { useUser } from '../hooks/hooks';

export default function ResolveTicketModal({ setOpen, updateticket, ticket }: { setOpen: Function, updateticket: Function, ticket: Ticket }) {

    const [loading, setLoading] = useState(false);

    const user = useUser('login/');


    const resolveTicket = async (e: FormEvent<CreateTicketForm>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const form = e.currentTarget.elements;

            const data = {
                id: ticket.id,
                notes: form.notes.value,
                user: user?.userid,
                assigned_user: ticket.assigned_user,
                status: 'resolved'
            }

            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)

            const response = await fetch(`${BASE_URL}tickets/${data.id}/`, {
                method: 'PUT',
                body: JSONdata,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setLoading(false);

            // Get the response data from server as JSON.
            const result = await response.json();
            ticket.status = result.status
            updateticket(ticket);

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
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Resolve Ticket
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Add your notes below to resolve this ticket
                                        </p>
                                    </div>

                                    <form className="space-y-6 mt-4" onSubmit={resolveTicket}>

                                        <div className='flex flex-col items-start'>
                                            <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                                                Your notes here
                                            </label>
                                            <div className="mt-2 w-full">
                                                <textarea
                                                    rows={4}
                                                    name="notes"
                                                    id="notes"
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
