import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost } from "./postSlice"
import { selectAllUsers } from "../users/usersSlice"


export default function AddPostForm() {

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')
	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const dispatch = useDispatch()

	const canSave = Boolean(title) && Boolean(content) && addRequestStatus === 'idle'

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setAddRequestStatus('pending')
				dispatch(addNewPost({ title, body: content, userId })).unwrap()
				setTitle('')
				setContent('')
				//setUserId('')
			} catch (err) {
				console.warn('failed to save the post', err)
			} finally {
				setAddRequestStatus('idle')
			}
		}
	}

	const users = useSelector(selectAllUsers)

	const usersOptions = users.map(user => (
		<option key={user.id} value={user.id}>{user.name}</option>
	))

	return (
		<>
			<h2>Add a New Post</h2>
			<form>
				<div>
					<label>
						<span>Post Title:</span>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
					</label>
				</div>
				<div>
					<label>
						<span>Post Message:</span>
						<textarea
							value={content}
							onChange={e => setContent(e.target.value)}
						></textarea>
					</label>
				</div>
				<div>
					<select onChange={(e) => setUserId(e.target.value)}>
						<option value=""></option>
						{usersOptions}
					</select>
				</div>
				<button
					className="send-post"
					type="button"
					onClick={onSavePostClicked}
					disabled={!title || !content}
				>
					Save Post
				</button>
			</form>
		</>
	)
}