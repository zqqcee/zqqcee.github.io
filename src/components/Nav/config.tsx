const baseURL = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
export const MenuConfig = {
	home: {
		title: '主页',
		icon: (props) => (
			<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
					fill="#fff"
				/>
			</svg>
		),
		href: baseURL + '/',
	},
	posts: {
		title: '文章',
		icon: (props) => (
			<svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
				<path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM10,16,7,17l1-3,7-7,2,2Z" />
			</svg>
		),
		href: baseURL + '/posts/1',
	},
	thoughts: {
		title: '小记',
		icon: (props) => (
			<svg fill="#fff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
				<path d="M467.14 44.84c-62.55-62.48-161.67-64.78-252.28 25.73-78.61 78.52-60.98 60.92-85.75 85.66-60.46 60.39-70.39 150.83-63.64 211.17l178.44-178.25c6.26-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.6 9.37 33.98 0l66.1-66.03C159.42 454.65 279 457.11 353.95 384h-98.19l147.57-49.14c49.99-49.93 36.38-36.18 46.31-46.86h-97.78l131.54-43.8c45.44-74.46 34.31-148.84-16.26-199.36z" />
			</svg>
		),
		href: baseURL + '/thoughts/1',
	},
	interview: {
		title: '秋招专栏',
		icon: (props) => (
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				fill="#fff"
				{...props}
			>
				<g>
					<path
						d="M328.094,308.469c-9.953,0-18.031,8.078-18.031,18.031c0,9.938,8.078,18.016,18.031,18.016
           s18.016-8.078,18.016-18.016C346.109,316.547,338.047,308.469,328.094,308.469z"
					/>
					<polygon points="256,168.813 266.203,168.813 256,155.75 245.797,168.813 	" />
					<path
						d="M278.594,156.781c7.109,0,12.875-5.781,12.875-12.875v-2.922c0-7.109-5.766-12.875-12.875-12.875
           s-12.875,5.766-12.875,12.875v2.922C265.719,151,271.484,156.781,278.594,156.781z"
					/>
					<path
						d="M454.406,249.688c31.797,0,57.594-25.781,57.594-57.594S486.203,134.5,454.406,134.5
           c-31.813,0-48-12.766-70.406-31.969c-54.406-35.219-57.594-92.25-128-92.25s-73.594,57.031-128,92.25
           C105.594,121.734,89.406,134.5,57.594,134.5S0,160.281,0,192.094s25.781,57.594,57.594,57.594h5.844L15.703,423.953l53.391-8.016
           L90.469,472l26.344-31.984c34.969,37.891,85.016,61.703,140.531,61.703c54.75,0,104.188-23.188,139.078-60.188L421.531,472
           l21.375-56.063l53.391,8.016l-47.734-174.266H454.406z M256,86L256,86c34.984,0,52.969,28.094,52.969,57.344
           c0,10.969-2.391,20-7.781,25.281c-7.109,6.969-15.484,6.266-16.313,7c0,0,0,7.406,0,12.297v1.922c0,1.641-1.344,2.969-2.969,2.969
           h-7.109c-1.625,0-2.953-1.328-2.953-2.969v-9.016c-0.688-0.391-1.328,0.078-1.891-0.234c0,0.031,0.016,0.063,0.016,0.078v9.172
           c0,1.641-1.328,2.969-2.969,2.969h-7.094c-1.641,0-2.969-1.328-2.969-2.969v-9.172c0-0.297,0.063-0.578,0.141-0.859H256h-1.078
           c0.078,0.281,0.141,0.563,0.141,0.859v9.172c0,1.641-1.328,2.969-2.969,2.969H245c-1.641,0-2.969-1.328-2.969-2.969v-9.172
           c0-0.016,0.016-0.047,0.016-0.078c-0.563,0.313-1.203-0.156-1.891,0.234v9.016c0,1.641-1.328,2.969-2.953,2.969h-7.109
           c-1.625,0-2.969-1.328-2.969-2.969v-1.922c0-4.891,0-12.297,0-12.297c-0.828-0.734-9.203-0.031-16.313-7
           c-5.391-5.281-7.781-14.313-7.781-25.281C203.031,114.094,221.016,86,256,86z M268.984,249.688l-161.938,76.969
           c-0.578-5.313-0.891-10.719-0.891-16.188c0-21.625,4.625-42.156,12.844-60.781H268.984z M257.344,461.656
           c-70.469,0-129.641-48.5-146.344-113.828l0.531,1.109l27.406-13.031c3.719,16.063,14.891,39.766,48.563,37.313
           c38.891-2.828,55.594-43.656,53.484-85.797l79.391-37.734h75.281c8.219,18.625,12.875,39.156,12.875,60.781
           C408.531,393.844,340.703,461.656,257.344,461.656z"
					/>
					<path
						d="M233.406,156.781c7.109,0,12.875-5.781,12.875-12.875v-2.922c0-7.109-5.766-12.875-12.875-12.875
           s-12.875,5.766-12.875,12.875v2.922C220.531,151,226.297,156.781,233.406,156.781z"
					/>
				</g>
			</svg>
		),
		href: baseURL + '/interview',
	},
	friends: {
		title: '友链',
		icon: (props) => (
			<svg
				version="1.1"
				id="_x32_"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				fill="#fff"
				{...props}
			>
				<g>
					<path
						d="M501.782,419.646c-9.604-18.553-24.674-30.619-39.394-38.813c-14.721-8.208-29.464-12.862-39.116-16.497
		c-7.635-2.838-15.668-6.52-21.064-10.321c-2.701-1.873-4.678-3.761-5.698-5.164c-1.052-1.458-1.108-2.104-1.124-2.47
		c0-7.253,0-16.29,0-28.046c4.798-5.372,10.56-12.106,15.956-20.753c5.626-9.006,10.639-20.212,13.732-33.656
		c1.761-0.861,3.515-1.849,5.228-3.053c5.268-3.626,9.723-8.926,13.342-15.819c3.666-6.926,6.822-15.598,10.177-27.321
		c2.128-7.467,3.125-13.524,3.132-18.872c0.008-4.957-0.908-9.46-3.02-13.302c-1.562-2.869-3.77-5.188-5.993-6.743
		c-2.24-1.562-4.335-2.438-6.065-3.012c-0.008-0.223-0.016-0.414-0.016-0.662c-0.024-5.81,1.132-15.58,2.446-24.522
		c0.789-5.468,1.276-11.278,1.276-17.278c0-9.181-1.132-18.857-4.08-28.404c-4.375-14.305-13.15-28.38-27.767-38.98
		c-14.513-10.56-34.389-17.588-60.642-19.701c-29.281-3.57-46.591-6.942-60.578-10.186c-13.971-3.228-24.993-6.464-41.06-9.596
		v0.008c-0.94-0.175-1.865-0.271-2.718-0.271c-2.104-0.016-4.36,0.534-6.201,1.506c-3.522,1.865-5.34,4.519-6.511,6.703
		c-1.976,3.905-2.614,7.444-3.244,11.181c-0.837,5.539-1.164,11.42-1.626,16.29c-0.223,2.423-0.486,4.582-0.765,6.089
		c-0.136,0.749-0.287,1.331-0.383,1.642l-0.072,0.231c-14.098,24.73-17.589,50.568-17.589,70.572c0,15.924,2.224,28.349,3.316,33.8
		c0.398,2.033,0.558,3.428,0.646,4.543c-1.124,0.796-2.303,1.737-3.531,2.94c-2.192,2.16-4.383,5.077-5.977,8.774
		c-1.594,3.682-2.558,8.098-2.55,13.007c0,3.825,0.558,7.93,1.754,12.361c4.335,16.099,9.723,27.28,16.433,35.346
		c5.005,6.097,10.799,10.089,16.386,12.76c3.108,13.429,8.113,24.626,13.732,33.624c5.396,8.647,11.158,15.381,15.956,20.753
		c0,11.756,0,20.793,0,28.046c0.008,0.136-0.056,0.885-1.235,2.47c-1.698,2.319-5.77,5.587-10.72,8.368
		c-4.941,2.813-10.719,5.276-15.756,7.054c-6.543,2.311-15.342,5.156-24.802,9.213c-14.186,6.072-30.118,14.903-42.742,29.519
		c-12.672,14.569-21.438,35.052-21.358,61.814c0,3.682,0.159,7.507,0.486,11.444l0.798,9.524h9.556h347.982l0.797-9.524
		c0.326-3.928,0.486-7.738,0.486-11.412C512.016,447.014,508.19,431.975,501.782,419.646z"
					/>
					<path
						d="M127.413,464.819c-0.088-30.237,9.372-57.191,27.368-77.88c12.783-14.8,29.671-26.579,51.58-35.96
		c4.32-1.849,8.448-3.451,12.297-4.862c0-3.3,0-6.782,0-10.703c4.312-4.822,9.484-10.87,14.33-18.641
		c0.478-0.757,0.916-1.626,1.379-2.422c-0.861-1.284-1.729-2.439-2.582-3.81c-5.866-9.388-10.544-19.638-13.963-30.572
		c-5.356-3.738-10.145-8.161-14.306-13.238c-9.213-11.07-15.963-25.248-21.151-44.511c-1.722-6.384-2.598-12.688-2.598-18.729
		c-0.016-8.042,1.522-15.708,4.567-22.73c1.562-3.634,3.514-7.046,5.818-10.201c-1.515-9.858-2.288-19.98-2.288-30.134
		c0-16.776,2.168-32.676,6.32-47.627c-4.296-0.726-8.751-1.339-13.509-1.721c-26.292-3.204-41.833-6.232-54.393-9.142
		c-12.552-2.9-22.451-5.81-36.876-8.623v0.008c-0.844-0.152-1.674-0.239-2.438-0.239c-1.888-0.016-3.913,0.478-5.571,1.347
		c-3.164,1.682-4.79,4.065-5.842,6.025c-1.777,3.507-2.351,6.679-2.918,10.042c-0.749,4.974-1.044,10.249-1.458,14.625
		c-0.199,2.176-0.438,4.12-0.686,5.467c-0.128,0.678-0.263,1.196-0.342,1.475l-0.072,0.206
		c-12.656,22.212-15.788,45.412-15.788,63.376c0,14.297,1.992,25.455,2.973,30.356c0.358,1.825,0.502,3.076,0.581,4.08
		c-1.012,0.709-2.072,1.554-3.171,2.638c-1.969,1.937-3.938,4.559-5.372,7.883c-1.427,3.307-2.296,7.268-2.288,11.675
		c0,3.435,0.502,7.125,1.578,11.102c3.888,14.457,8.726,24.498,14.752,31.743c4.494,5.475,9.698,9.062,14.72,11.46
		c2.79,12.059,7.284,22.108,12.329,30.189c4.846,7.771,10.018,13.82,14.33,18.641c0,10.552,0,18.673,0,25.185
		c0.008,0.119-0.048,0.788-1.108,2.215c-1.53,2.08-5.188,5.022-9.627,7.516c-4.439,2.527-9.627,4.742-14.154,6.336
		c-5.874,2.072-13.772,4.631-22.267,8.273c-12.744,5.451-27.05,13.381-38.383,26.507C7.803,424.532-0.07,442.926,0,466.955
		c0,3.308,0.144,6.743,0.439,10.28l0.717,8.552h8.575h118.876l-0.621-7.484C127.604,473.729,127.413,469.202,127.413,464.819z"
					/>
				</g>
			</svg>
		),
		href: baseURL + '/friends',
	},
	bookmark: {
		title: '书签',
		icon: (props) => (
			<svg viewBox="-4 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="Icon-Set-Filled" transform="translate(-419.000000, -153.000000)" fill="#fff">
						<path
							d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"
							id="bookmark"
						></path>
					</g>
				</g>
			</svg>
		),
		href: baseURL + '/bookmark',
	},
	// message: {
	// 	title: '留言',
	// 	icon: (props) => (
	// 		<svg viewBox="-4 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
	// 			<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
	// 				<g id="Icon-Set-Filled" transform="translate(-419.000000, -153.000000)" fill="#fff">
	// 					<path
	// 						d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"
	// 						id="bookmark"
	// 					></path>
	// 				</g>
	// 			</g>
	// 		</svg>
	// 	),
	// 	href: baseURL + '/message',
	// },
};
