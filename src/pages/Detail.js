import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props){

    const {id} = useParams() //url파라미터에 담긴 값을 가져오는 hook

    //[id]번째 상품이아닌 상품id가 {id}인거 보여주기
    const goods = props.books.find(function(x){
        return x.itemId === Number(id)
    })

    //알림div 상태
    const [alertVisible, setAlertVisible]= useState(true)

    useEffect(()=>{
        //타이머
        const timer = setTimeout(()=>{
            setAlertVisible(false)
        },2000)
        //컴포넌트 unmount시 초기화
        return () => clearTimeout(timer)
    })
    
    return(
        <div className="container">
            {goods != null && (
                <div className="row">
                    {alertVisible &&(
                        <div className="alert alert-warning">
                            2초 이내 구매시 할인
                        </div>
                    )}
                    <div className="col-md-6">
                        <img src={process.env.PUBLIC_URL + `/img/book${goods.itemId}.PNG`} alt="상품이미지" width={"100%"}/>
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{goods.title}</h4>
                        <p>{goods.content}</p>
                        <p>{goods.price} 원</p>
                        <button className="btn btn-danger">주문하기</button>
                        
                    </div>
                </div>
            )}
            {goods == null && <div>없는상품</div>}
        </div>
    )
}

export default Detail;