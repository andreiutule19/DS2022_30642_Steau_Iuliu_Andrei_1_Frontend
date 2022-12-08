
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from '../../components/sidebarAdmin/Sidebar';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Background from '../../images/bg-sign-in-basic.jpeg';


const Home = () => {

  return (
    <div className='full-screen bg-users' style={{backgroundImage: `url(${Background})`}}>
      <Sidebar />
    
        <div className='main-container'>
          <p>He he .. we re home </p>
      </div>
      </div>
     
  
    );
  


}
export default Home;