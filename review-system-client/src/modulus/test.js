import React from 'react';

const DeveloperTest = () => {
	React.useEffect(() => {
		const existingScript = document.getElementById('zegal-cdn');

		if (!existingScript) {
			const script = document.createElement('script');

			const isLocalhost = window.location.hostname === `localhost` || window.location.hostname === `127.0.0.1`;

			script.src = true
				? 'http://localhost:8080/zegal.lite.local.min.js'
				: 'https://zegal-client.s3.ap-south-1.amazonaws.com/iframe/zegal.js';
			script.id = 'zegal-cdn';

			document.body.appendChild(script);

			script.onload = () => {
				// @ts-ignore
				const Zegal = window?.Zegal;

				var zKEY = {
					APIKEY: 'pk_d673b831-a9b8-43c2-b788-6a68a15a83a1',
					WLID: '628ca170e63d8e578358e595',
					category: '62da1da8816ff0d01bc26a23',
					doctype: '62e36d387a5a845189ff4bb9',
					guide: '62da1cfe816ff06d80c26a20'
				};

				//staging
				// var zKEY = {
				// 	APIKEY: 'pk_0a476f39-d75e-4527-b3d5-909ebe472775',
				// 	WLID: '62b2e391d3101c1a8955d506',
				// 	category: '634e82ecc274156ea761ed76',
				// 	doctype: '6352473ae0190f7002bf5818',
				// 	guide: '611a0c7e8cf39979a161ef94'
				// };

				const zegal = new Zegal({
					APIKEY: zKEY.APIKEY,
					WLID: zKEY.WLID,
					CONTAINERID: 'zegal-iframe-container',
					GUIDEID: zKEY.guide
				});

				zegal.loadDocument({
					...zKEY,
					existing: false
				});

				// @ts-ignore
				window.zegal = zegal;
			};

			script.onerror = (error) => {
				console.error('Error while loading script', error);
			};
		}
	}, []);

	return (
		<>
			<div
				style={{
					position: 'fixed',
					inset: 0,
					backgroundColor: '#fff',
					zIndex: 9999
				}}
			>
				<button
					onClick={() => {
						// @ts-ignore
						window.zegal.getInvoice({});
					}}
				>
					invoice
				</button>
				<div id='zegal-iframe-container' style={{height: '100%'}} />
			</div>
		</>
	);
};

export default DeveloperTest;
