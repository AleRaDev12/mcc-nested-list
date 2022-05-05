import React from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import './index.scss'


const SimpleStylesList = () => {
	return (<>
			<div className={'treeList'}>

				<div className={'treeList--buttons'}>
					<button>Add item</button>
					<button>Reset</button>
				</div>

				<ul>
					<li className="treeList--item">List text sample
						<div>
							<TiArrowLeftThick size={24}/>
							<TiArrowUpThick size={24}/>
							<TiArrowDownThick size={24}/>
							<TiArrowRightThick size={24}/>
							<TiDelete size={24}/>
						</div>
					</li>
					<ul>
						<li className="treeList--item">List text sample
							<div>
								<TiArrowLeftThick size={24}/>
								<TiArrowUpThick size={24}/>
								<TiArrowDownThick size={24}/>
								<TiArrowRightThick size={24}/>
								<TiDelete size={24}/>
							</div>
						</li>
						<li className="treeList--item">List text sample
							<div>
								<TiArrowLeftThick size={24}/>
								<TiArrowUpThick size={24}/>
								<TiArrowDownThick size={24}/>
								<TiArrowRightThick size={24}/>
								<TiDelete size={24}/>
							</div>
						</li>
						<ul>
							<li className="treeList--item">List text sample
								<div>
									<TiArrowLeftThick size={24}/>
									<TiArrowUpThick size={24}/>
									<TiArrowDownThick size={24}/>
									<TiArrowRightThick size={24}/>
									<TiDelete size={24}/>
								</div>
							</li>
							<ul>
								<li className="treeList--item">List text sample
									<div>
										<TiArrowLeftThick size={24}/>
										<TiArrowUpThick size={24}/>
										<TiArrowDownThick size={24}/>
										<TiArrowRightThick size={24}/>
										<TiDelete size={24}/>
									</div>
								</li>
								<li className="treeList--item">List text sample
									<div>
										<TiArrowLeftThick size={24}/>
										<TiArrowUpThick size={24}/>
										<TiArrowDownThick size={24}/>
										<TiArrowRightThick size={24}/>
										<TiDelete size={24}/>
									</div>
								</li>
							</ul>
							<li className="treeList--item">List text sample
								<div>
									<TiArrowLeftThick size={24}/>
									<TiArrowUpThick size={24}/>
									<TiArrowDownThick size={24}/>
									<TiArrowRightThick size={24}/>
									<TiDelete size={24}/>
								</div>
							</li>
						</ul>
						<li className="treeList--item">List text sample
							<div>
								<TiArrowLeftThick size={24}/>
								<TiArrowUpThick size={24}/>
								<TiArrowDownThick size={24}/>
								<TiArrowRightThick size={24}/>
								<TiDelete size={24}/>
							</div>
						</li>
						<li className="treeList--item">List text sample
							<div>
								<TiArrowLeftThick size={24}/>
								<TiArrowUpThick size={24}/>
								<TiArrowDownThick size={24}/>
								<TiArrowRightThick size={24}/>
								<TiDelete size={24}/>
							</div>
						</li>
						<li className="treeList--item">List text sample
							<div>
								<TiArrowLeftThick size={24}/>
								<TiArrowUpThick size={24}/>
								<TiArrowDownThick size={24}/>
								<TiArrowRightThick size={24}/>
								<TiDelete size={24}/>
							</div>
						</li>
					</ul>
					<li className="treeList--item">List text sample
						<div>
							<TiArrowLeftThick size={24}/>
							<TiArrowUpThick size={24}/>
							<TiArrowDownThick size={24}/>
							<TiArrowRightThick size={24}/>
							<TiDelete size={24}/>
						</div>
					</li>
					<li className="treeList--item">List text sample
						<div>
							<TiArrowLeftThick size={24}/>
							<TiArrowUpThick size={24}/>
							<TiArrowDownThick size={24}/>
							<TiArrowRightThick size={24}/>
							<TiDelete size={24}/>
						</div>
					</li>
				</ul>

				<div className="treeList--item" style={{marginLeft: 1.75 + 'em'}}>List text sample div
					<div>
						<TiArrowLeftThick size={24}/>
						<TiArrowUpThick size={24}/>
						<TiArrowDownThick size={24}/>
						<TiArrowRightThick size={24}/>
						<TiDelete size={24}/>
					</div>
				</div>

				<div className="treeList--item" style={{marginLeft: 2 * 1.75 + 'em'}}>List text sample div
					<div>
						<TiArrowLeftThick size={24}/>
						<TiArrowUpThick size={24}/>
						<TiArrowDownThick size={24}/>
						<TiArrowRightThick size={24}/>
						<TiDelete size={24}/>
					</div>
				</div>

				<div className="treeList--item" style={{marginLeft: 3 * 1.75 + 'em'}}>List text sample div
					<div>
						<TiArrowLeftThick size={24}/>
						<TiArrowUpThick size={24}/>
						<TiArrowDownThick size={24}/>
						<TiArrowRightThick size={24}/>
						<TiDelete size={24}/>
					</div>
				</div>

				<div className="treeList--item">List text sample div
					<div>
						<TiArrowLeftThick size={24}/>
						<TiArrowUpThick size={24}/>
						<TiArrowDownThick size={24}/>
						<TiArrowRightThick size={24}/>
						<TiDelete size={24}/>
					</div>
				</div>


			</div>
		</>
	)
}

export default SimpleStylesList