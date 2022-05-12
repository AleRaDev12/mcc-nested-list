import React, {useEffect, useState} from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import styles from './Item.module.scss'
import {useNestedList} from './CRUDProvider'


const Item = ({item, ...props}) => {

	// console.log('usecontext start')
	const context = useNestedList()
	// const context = null
	// console.log('usecontext end')

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
		if (e.key === 'Enter') {
			context.crud.update(item, nowText)
			textChangingToggle()
		}
	}

	const cancelEditing = () => {
		textChangingToggle()
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
						onKeyUp={e => keyPressHandler(e)}
						onBlur={cancelEditing}
						autoFocus={true}
					/>
					<span className="text-xs text-gray-200">press Enter for save</span>
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