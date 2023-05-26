import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Swiper, SwiperSlide } from "swiper/react";
import './Home.css';
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { Navigation } from "swiper";

export default function Home() {
    const [open, setOpen] = React.useState(true);
    const [cropopen, setCropOpen] = React.useState(false);
    const [crop,setCrop] = useState(true);
    const [cropImageDetail,setCropDetail] = useState({ padding: '0', objectFit: 'cover' });
    const [postImage, setPostImage] = useState("");
    const [postPreview, setPostPreview] = useState("");
    const [statusOn,setStatus] = useState(false);
    const [numFiles, setNumFiles] = useState(0);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const CropOptions = ()=> {
      setCrop(false);
    };

    const Back = () =>{
      setPostImage("");
      setCropDetail({padding: '0', objectFit: 'cover'});
      setCrop(true);
    }

    const GoBack = () =>{
      setStatus(false);
      setPostImage("lala");
      setOpen(true);
    }

    const tittle = (e) => {
      setTitle(e.target.value);
    }
  
    const contentset = (e) => {
      setContent(e.target.value);
    }

    const Uploadpost = () => {
      const formData = new FormData();
      formData.append('caption', title);
      formData.append('content', content);
  
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
      axios
        .post("http://localhost:5000/api/add", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    const StatusOpen = () => {
      setStatus(true);
      setOpen(false);
      setCropOpen(true);
    }
    const cropType = (val) => {
      if(val === 'Original'){
        setCropDetail({padding:'0%',objectFit:'contain'});
      }
      else if(val === '1:1'){
        setCropDetail({padding:'0%',objectFit:'cover'});
      }
      else if(val === '4:3'){
        setCropDetail({padding:'0 10%',objectFit:'cover'});
      }
      else if(val === '16:9'){
        setCropDetail({padding:'20% 0',objectFit:'cover'});
      }
    }

  
    const handleClose = () => {
      setOpen(false);
    };

 
  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 13,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: '10px',
    backgroundColor: '#228CEB',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
    
  const ButtonCrop = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: 'rgba(190, 190, 190, 0.5)',
    borderRadius:'0'
  });

  const numbers = Array.from({ length: 10 }, (_, index) => index);

  const handleFileChange = (e) => {
    setPostImage("");
    setPostPreview("")
    //const files = Array.from(e.target.files);
    //setImageFiles(files);
    setPostImage(e.target.files[0]);
    setNumFiles(e.target.files.length);

    const selectedFIles =[];
      const targetFiles =e.target.files;
      const targetFilesObject= [...targetFiles]
      targetFilesObject.map((file)=>{
         return selectedFIles.push(URL.createObjectURL(file))
      })
      setImages(selectedFIles);
      setSelectedImages(Array.from(e.target.files));
    }
    return (
      <div>
      
        {statusOn && (
          <Dialog open={cropopen} fullScreen={fullScreen} maxWidth="md" onClose={() => setCropOpen(false)}>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems:'centre',fontSize: '14',overflow:'hidden',fontWeight: '550',padding:'8px 16px',borderBottom:'1px solid #e8e7e3'}}>
              <div class="left" onClick={GoBack}><ArrowBackIcon></ArrowBackIcon></div>
                <div class="center">write caption</div>
                <div class="right" onClick={Uploadpost} style={{color:'blue'}}>Share</div>
            </div>
            <div style={{position:'relative',width:'800px',height:'390px',overflow:'hidden'}}>
              <div className='statuspostcontainer'>
                <div className='postimage'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                      {images.map((url,index)=>(
                         <SwiperSlide>
                            <img key={index} width={'100%'} height={'100%'} style={{position: 'absolute',top: '0',left: '0',bottom: '0',right: '0',padding:cropImageDetail.padding,objectFit:cropImageDetail.objectFit}} maxWidth="xs" draggable="true" src={url} alt="post" />
                         </SwiperSlide>
                      ))}
                      </Swiper>
                </div>
                <div className='statusbox'>
                <input type="text" onChange={tittle} name='caption' placeholder='tittle'/>
                      <input type="text" onChange={contentset} name='content' placeholder='content'/>
                </div>
              </div>
            </div>
          </Dialog>
        )}
       
        {postImage ?
            <Dialog open={open} sx={{ '& .MuiDialog-paper':{m: 0, p: 0,width: '30%', maxHeight: 475 ,borderRadius: '16px' } }} maxWidth="xs" onClose={handleClose}>
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems:'centre',fontSize: '14',overflow:'hidden',fontWeight: '550',padding:'8px 16px',borderBottom:'1px solid #e8e7e3'}}>
              <div class="left" onClick={Back}><ArrowBackIcon></ArrowBackIcon></div>
                <div class="center">Crop</div>
                  <div class="right" onClick={StatusOpen} style={{color:'blue'}}>Next</div>
                   </div>
                      <div style={{position:'relative',height:'390px',overflow:'hidden'}}>
                      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                      {images.map((url,index)=>(
                         <SwiperSlide>
                            <img key={index} width={'100%'} height={'100%'} style={{position: 'absolute',top: '0',left: '0',bottom: '0',right: '0',padding:cropImageDetail.padding,objectFit:cropImageDetail.objectFit}} maxWidth="xs" draggable="true" src={url} alt="post" />
                         </SwiperSlide>
                      ))}
                      </Swiper>
                      {crop ? <div className="overlay">
                      <div title="Crop" onClick={CropOptions}>
                      <IconButton><CropFreeIcon sx={{ color:'white' ,fontSize:'18px'}}/></IconButton>
                      </div>
                      </div>
                      :
                      <div className='cropSelection'>
                        <ButtonCrop variant="contained" component="label" onClick={() => cropType('Original')}>Original</ButtonCrop>
                        <ButtonCrop variant="contained" component="label" onClick={() => cropType('1:1')}>1:1</ButtonCrop>
                        <ButtonCrop variant="contained" component="label" onClick={() => cropType('4:3')}>4:3</ButtonCrop>
                        <ButtonCrop variant="contained" component="label" onClick={() => cropType('16:9')}>16:9</ButtonCrop>
                      </div>
                      }
                  </div>
              </Dialog>
              :
              <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: '435px' ,borderRadius: '16px'} }} maxWidth="xs" >
                <DialogTitle sx={{display: 'flex',flexDirection: 'column',m: 'auto',width: 'fit-content',fontSize: 15,fontWeight: 550,}}>Create new post</DialogTitle>
              <DialogContent dividers>
               <Container maxWidth="sm" sx={{height:'50vh'}}>
                  <Box sx={{ paddingTop:'15%',display:'flex', flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                    <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                      <DialogTitle>Drag photos and videos here</DialogTitle>
                        <BootstrapButton variant="contained" component="label">
                          Select From Computer
                          <input name="images" hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
                       </BootstrapButton>
                  </Box>
                </Container>
              </DialogContent>
            </Dialog>
          }
      </div>
    );
  }