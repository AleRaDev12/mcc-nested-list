import React, {useEffect, useState} from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import styles from './Item.module.scss'
import {useNestedList} from './CRUDProvider'


const Item = ({item, ...props}) => {

	const context = useNestedList()

	const [isTextChanging, setIsTextChanging] = useState(false)
	const [nowText, setNowText] = useState()

	useEffect(() => {
		setNowText(item.text)
	}, [item])

	const textChangingToggle = () => {
		setIsTextChanging(prev => !prev)
	}

	const textChangingHandler = (e) => {
		setNowText(e.target.value)
	}

	const keyPressHandler = (e) => {
		switch (e.key) {
			case 'Enter': {
				context.crud.update(item, nowText)

				if (e.shiftKey)
					context.crud.add(item.index)

				cancelEditing()
				break
			}
			case
			'Escape': {
				setNowText(item.text)
				textChangingToggle()
				break
			}
			default:
				break
		}

	}

	const cancelEditing = () => {
		textChangingToggle()
		setNowText(item.text)
	}

	return (
		<li
			className={styles.Item}
			{...props}
		>
			{isTextChanging
				?
				<>
					<input
						type="text"
						value={nowText}
						onChange={e => textChangingHandler(e)}
						onKeyDown={e => keyPressHandler(e)}
						onBlur={cancelEditing}
						autoFocus={true}
					/>
					<span className="text-xs text-gray-200">press Enter for save, <br/>Shift+Enter to add item after that</span>
				</>
				:
				<>
					<span
						onClick={textChangingToggle}
						data-id={JSON.stringify(item.index)}
						className={styles.text}
					>
						{item.text}
					</span>
					<div>
						<TiArrowLeftThick
							onClick={e => context.crud.toLeft(item)}
							size={24}
						/>
						<TiArrowUpThick
							onClick={e => context.crud.toUp(item)}
							size={24}
							data-inactive={Array.isArray(item.index) && item.index.at(-1) === 0}
						/>
						<TiArrowDownThick
							onClick={e => context.crud.toDown(item)}
							size={24}
							className="down"
						/>
						<TiArrowRightThick
							onClick={e => context.crud.toRight(item)}
							size={24}
							data-inactive={(Array.isArray(item.index) && item.index.at(-1) === 0)}
						/>
						<TiDelete
							onClick={e => context.crud.remove(item)}
							size={24}
							className="ml-3"
						/>
					</div>
				</>
			}

		</li>
	)
}

export default Item