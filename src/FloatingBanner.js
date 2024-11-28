import { useEffect, useState } from "react";

function FloatingBanner() {

	const [offset, setOffset] = useState(0);
	const recentItems = JSON.parse(localStorage.getItem('obj')) || []

	useEffect(() => { //화면로드시
		const handleScroll = () => {
			// 현재 스크롤 위치를 저장
			setOffset(window.scrollY);
		}
		// 스크롤 이벤트 리스너 등록
		window.addEventListener("scroll", handleScroll);

		// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
		return () => window.removeEventListener("scroll", handleScroll);
	}, [])

	return (
		<div
			className="floating-banner"
			style={{
				top: `${offset + 350}px`, // 기본 위치에서 스크롤 만큼 이동
			}}
		>
			<div className="banner-content">
				<h3>최근 본 상품</h3>
				<div>
					{recentItems.length > 0 ? (
						recentItems.map((item) => (
							<div key={item.id}>
								<p>{item.id}</p>
							</div>
						))
					) : (<p>최근 본 상품이 없습니다</p>)}
				</div>

			</div>
		</div>
	)
}

export default FloatingBanner;