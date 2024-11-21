import { parseISO, formatDistanceToNow } from "date-fns"

export default function TimeAgo({ timestamp }) {

	let timeAgo = ''
	if (timestamp) {
		const date = parseISO(timestamp)
		const timePerod = formatDistanceToNow(date)
		timeAgo = `${timePerod} ago`
	}

	return (
		<span title={timestamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	)
}