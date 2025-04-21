import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/shared/utils/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface DataPickerProps {
	date: Date | undefined
	setDate: (date: Date | undefined) => void
	toYear: number
}

export const DatePicker = ({date, setDate, toYear}: DataPickerProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					captionLayout="dropdown"
					selected={date}
					onSelect={setDate}
					toYear={toYear}
					fromYear={1900}
					classNames={{
						day_hidden: "invisible",
						dropdown: "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
						caption_dropdowns: "flex gap-3",
						vhidden: "hidden",
						caption_label: "hidden",
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}