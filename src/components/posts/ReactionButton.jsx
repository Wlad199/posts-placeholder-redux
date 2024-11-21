import { addReaction } from "./postSlice"
import { useDispatch } from "react-redux"

const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕'
}

export default function ReactionButton({ post }) {

	const dispatch = useDispatch()

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				className="emoji"
				key={name}
				type="button"
				onClick={() => dispatch(addReaction({ postId: post.id, reaction: name }))}
			>
				<span>
					<span>{emoji}</span>
					<span>{post.reactions[name]}</span>
				</span>
			</button>
		)
	})

	return (
		<>
			{reactionButtons}
		</>
	)
}