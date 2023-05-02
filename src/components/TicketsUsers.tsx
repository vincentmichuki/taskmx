import { Fragment } from 'react'
import { Ticket } from '../types/types'


export default function TicketsUsers({ tickets }: { tickets: Ticket[] }) {

  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {tickets.map((tk: Ticket) => (
        <li key={tk.title.toString()} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className='h-8 w-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10'></div>
            <div className="text-sm font-medium leading-6 text-gray-900">{tk.title}</div>

          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">

            {tickets.filter(item => item.id == tk.id).map((i: Ticket) => (
              <Fragment key={i.title.toString()}>
                <div className="flex justify-between gap-x-4 py-3">
                  <dd className="text-gray-600">
                    <span>{tk.assigned_user}</span>
                  </dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  )
}
