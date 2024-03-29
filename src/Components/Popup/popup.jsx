import style from "./Popup.module.scss";
const Popup = () => {
    return ( 
        <div className={style.container}>
            <div className={style.buttoncont}><button className={style.button}>Close</button></div>
            <div className={style.name}>Bridging theory Chapter - 5</div>
            <div className={style.filecontainer}>
                <div className={style.file}>Bridging Theory Part - file <a href="#" download>Download</a></div>
                <div className={style.file}>File Name -1 <a href="#" download>Download</a></div>
                <div className={style.file}>File Name -1 <a href="#" download>Download</a></div>
                <div className={style.file}>File Name -1 <a href="#" download>Download</a></div>
               
            </div>
        </div>
    )
}

export default Popup;