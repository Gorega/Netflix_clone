import styles from "../../styles/person/PersonHome.module.css";
import Nav from "../Nav";
import MainSection from "./mainSection";
import SideSection from "./SideSection";

function PersonHome({person,credits,social}){
return <>
<Nav />
<div className={styles.main}>
    <SideSection person={person} credits={credits} social={social} />
    <MainSection person={person} credits={credits} />
</div>
</>

}

export default PersonHome;