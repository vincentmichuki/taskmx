import { Fragment, useState } from 'react'
import { Menu, Dialog, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import DashboardScaffold from '@/src/components/DashboardScaffold'
import { Ticket } from '@/src/types/types'
import { BASE_URL } from '@/src/utils/constants'
import CreateTicketModal from '@/src/components/CreateTicketModal'
import ReassignTicketModal from '@/src/components/ReassignTicketModal'
import ResolveTicketModal from '@/src/components/ResolveTicketModal'
import FiltersWidget from '@/src/components/FiltersWidget'
import TicketsUsers from '@/src/components/TicketsUsers'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}tickets/`, {
    method: 'GET'
  });

  // Get the response data from server as JSON.
  const tks = await response.json();

  if (!tks) {
    return {
      notFound: true,
    };
  }
  return {
    props: { tks },
  };
}

export default function Dashboard({ tks }: { tks: Ticket[] }) {
  const [tickets, setTickets] = useState(tks);

  const [currentTicket, setCurrentticket] = useState(tickets[0]);
  const [open, setOpen] = useState(false);

  const [openAssignModal, setOpenAssignModal] = useState(false);

  const [openResolveModal, setOpenResolveModal] = useState(false);

  function updateTicket(ticket: Ticket) {
    setTickets(tickets.map(item => {
      if (item.id === ticket.id) {
        return ticket;
      }
      return item;
    }))
  }

  function addTicket(ticket: Ticket) {
    tickets.push(ticket);
    setTickets(tickets);
  }

  function filterTickets(type: String, param: String) {
    if (param === 'all') {
      setTickets(tks);
      return;
    }
    switch (type) {
      case 'user':
        setTickets(tks.filter(item => item.assigned_user == param));
        break;
      case 'type':
        setTickets(tks.filter(item => item.ticket_type == param));
        break;
      case 'status':
        setTickets(tks.filter(item => item.status == param));
        break;
      case 'date':
        setTickets(tks.filter(item => item.created === param));
        break;
      default:
        setTickets(tks);
    }
  }

  return (
    <DashboardScaffold>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">All Tickets</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and manage your tickets. You have a total of <strong className="font-semibold text-gray-900">{tickets.length}</strong> tickets
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => { setOpen(true) }}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new ticket
            </button>
            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <CreateTicketModal setOpen={setOpen} addTicket={addTicket} />
              </Dialog>
            </Transition.Root>
          </div>
        </div>

        <div className='mt-10'>
          <FiltersWidget tickets={tks} filterTickets={filterTickets} />
        </div>

        <div className="-mx-4 mt-5 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-300 overflow-auto">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Assignee
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tk, planIdx) => (
                <tr key={tk.id.toString()}>
                  <td
                    className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                  >
                    <div className="font-medium text-gray-900">
                      {tk.title}
                    </div>
                  </td>
                  <td
                    className='hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                  >
                    {tk.created.split('T')[0]}
                  </td>
                  <td
                    className='hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                  >
                    {tk.ticket_type}
                  </td>
                  <td
                    className='hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                  >
                    {tk.status}
                  </td>
                  <td
                    className='px-3 py-3.5 text-sm text-gray-500'
                  >
                    {tk.assigned_user}
                  </td>
                  <td
                    className={'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'}
                  >
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenResolveModal(true);
                                  setCurrentticket(tk);
                                }}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                                )}
                              >
                                Resolve<span className="sr-only">, resolve</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenAssignModal(true);
                                  setCurrentticket(tk);
                                }}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                                )}
                              >
                                Reassign<span className="sr-only">, reassign</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // delete ticket here
                                }}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                                )}
                              >
                                Delete<span className="sr-only">, delete</span>
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* tickets by user */}


        <div className="sm:flex sm:items-center mt-10">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Ticket by users</h1>
            <p className="mt-2 text-sm text-gray-700">
              There are a total of <strong className="font-semibold text-gray-900">{tickets.length}</strong> tickets
            </p>
          </div>
        </div>

        <div className='mt-6 -mx-4 sm:mx-0 sm:rounded-lg bg-white px-6 py-8'>
          <TicketsUsers tickets={tks}/>
        </div>

      </div>

      <Transition.Root show={openAssignModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenAssignModal}>
          <ReassignTicketModal setOpen={setOpenAssignModal} ticket={currentTicket} updateticket={updateTicket} />
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openResolveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenResolveModal}>
          <ResolveTicketModal setOpen={setOpenResolveModal} ticket={currentTicket} updateticket={updateTicket} />
        </Dialog>
      </Transition.Root>

    </DashboardScaffold>
  )
}
