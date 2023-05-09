import React,{useState} from "react";
import logo from './Images/logo.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import './sidebar.css'
import Home from "./Home";

export default function Sidebar(){
  const [open,setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

    return(
    <div className="sidebar">
      <header className="sidebar-header">
        <img src={logo} />
      </header>
      <nav>
        <button>
          <span>
            <HomeOutlinedIcon/>
            <span>Home</span>
          </span>
        </button>

        <button>
          <span>
            <SearchOutlinedIcon/>
            <span>Search</span>
          </span>
        </button>

        <button>
          <span>
            <ExploreOutlinedIcon/>
            <span>Explore</span>
          </span>
        </button>

        <button>
          <span>
            <SendIcon>
              <span>12</span>
            </SendIcon>
            <span>Messages</span>
          </span>
        </button>

        <button>
          <span>
            <FavoriteBorderIcon>
              <em></em>
            </FavoriteBorderIcon>
            <span>Notifications</span>
          </span>
        </button>

        <button onClick={handleClickOpen}>
          <span>
            <AddBoxOutlinedIcon/>
            <span>Add</span>
            {open && (<Home/>)}
          </span>
        </button>

        <button>
          <span>
            <img src="" />
            <span>Profile</span>
          </span>
        </button>

        <button>
          <span>
            <MenuOutlinedIcon/>
            <span>More</span>
          </span>
        </button>
      </nav>
    </div>
    )
}