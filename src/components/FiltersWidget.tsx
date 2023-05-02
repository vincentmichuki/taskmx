import { Ticket } from "../types/types";


export default function FiltersWidget({ filterTickets, tickets }: { filterTickets: Function, tickets: Ticket[] }) {
    return (
        <div className="w-full flex">
            <div className="mr-6">
                <label htmlFor="location" className="block text-sm leading-6 text-gray-900">
                    Filter by assignee
                </label>
                <select
                    id="assignee"
                    name="assignee"
                    onChange={(e) => {
                        filterTickets('user', e.target.value);
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900"
                >
                    <option value="all">All</option>
                    {tickets.map((tk: Ticket) => (
                        <option key={tk.title.toString()} value={tk.assigned_user.toString()}>{tk.assigned_user}</option>
                    ))}
                </select>
            </div>

            <div className="mr-6">
                <label htmlFor="location" className="block text-sm leading-6 text-gray-900">
                    Filter by ticket type
                </label>
                <select
                    id="type"
                    name="type"
                    onChange={(e) => {
                        filterTickets('type', e.target.value);
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900"
                >
                    <option value="all">All</option>
                    <option value="product support">Product support</option>
                    <option value="inquiry">Inquiry</option>
                    <option value="complaint">Complaint</option>
                </select>
            </div>

            <div className="mr-6">
                <label htmlFor="location" className="block text-sm leading-6 text-gray-900">
                    Filter by ticket status
                </label>
                <select
                    id="status"
                    name="status"
                    onChange={(e) => {
                        filterTickets('status', e.target.value);
                    }}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900"
                >
                    <option value="all">All</option>
                    <option value="resolved">Resolved</option>
                    <option value="Open">Open</option>
                </select>
            </div>

            <div>
                <label htmlFor="date" className="block text-sm leading-6 text-gray-900">
                    Filter by date
                </label>
                <input id="date" type="date"
                onChange={(e)=> {
                    filterTickets('date', e.target.value);
                }}
                 className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900" />
            </div>
        </div>
    )
}