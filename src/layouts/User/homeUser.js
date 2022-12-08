import 'bootstrap/dist/css/bootstrap.css';
import SidebarUser from '../../components/sidebarUser/Sidebar';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Background from '../../images/bg-sign-in-basic.jpeg';
const HomeUser = () => {


  return (
    <div className='full-screen bg-users' style={{backgroundImage: `url(${Background})`}}>
      <SidebarUser />
    
        <div className='main-container'>
          <p>He he .. we re home </p>
      </div>
      </div>
     
  
    );
  


}
export default HomeUser;