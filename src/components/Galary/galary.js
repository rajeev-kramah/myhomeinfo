import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { addGallery, getGallery, deleteGallery } from "../../store/Actions/Gallery";
import { NotificationManager } from "react-notifications";

const IMAGES =
[{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
    caption: "Boats (Jeshu John - designerspics.com)"
},
 
{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: true,
    caption: "After Rain (Jeshu John - designerspics.com)"
},
{
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
    caption: "Boats (Jeshu John - designerspics.com)"
},
{
src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
thumbnailWidth: 320,
thumbnailHeight: 212,
tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
caption: "Boats (Jeshu John - designerspics.com)"
},

{
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212
}]


const Galleries = (props) => {
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    const [id, setId] = useState('');
    const [attachment, setAttachment] = useState('');
    const [download, setDownload] = useState('');
    const [docName, setDocName] = useState('');
    const [house_id, setHouse_id] = useState(houseId);

    const [active, setActive] = useState("Home");

    useEffect(()=> {
        if(attachment) {
            var form = new FormData();
            form.append('id', id);
            form.append('house_id', house_id);
            form.append("attachment", attachment);
            props.addGallery(form);
            setAttachment("");
        }
    }, [attachment])
  
    const handleDocumentUpload = (event)=> {
        setAttachment(event.target.files[0])
        setDocName(event.target.files[0]['name']);
    }

    const handleDelete = (id) => {
        props.deleteGallery({id : id, house_id: house_id});
        // NotificationManager.error("Success Message", "Attachment deleted");
    }

    const handleDocType = (type) => {
        setActive(type);
        let doc = [];
        if(props.links && props.links.length > 0) {
            for(let i=0; i<props.links.length; i++){
                if(props.links[i]["category"] == type){
                    doc.push(props.links[i]);
                }
            }
        }
    }

    return (
        <div className="container-fluid loan">
            <h4>Gallery</h4>
            <div className="contact-form">
            <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Home"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Home")}>Home</span>
                        <span className={active === "Personal"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Personal")}>Personal</span>
                        <span className={active === "Other"? "active-bar mr-50": "mr-50"} onClick={(e) => handleDocType("Other")}>Other</span>
                    </div>
                </div>
                <div className="row " style={{marginTop: "2%"}}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="attachment">Select Image</label>
                            <label htmlFor="file" className="fileContainer">
                                <div className="attachfile" align="center">
                                    <i>Click here to attach Image</i>
                                    <p>{docName ? docName : ""}</p>
                                    
                                </div>
                                <input type="file" style={{height:"0px"}} id="file" onChange={(event)=>handleDocumentUpload(event)} className="form-control" style={{"visibility":"hidden"}} accept="audio/*,video/*,image/*" />
                            </label>
                        </div>
                    </div>

                    {/* <div className="col-md-2" style={{marginTop: "2%"}}>
                        <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                        <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                    </div> */}
                </div>
            </div>

                {/* *Galary Code */}
                <div className="contact-form galary">
                    <div className="row">
                    { 
                    props.galleries && props.galleries.map((image)=>{
                        return(
                            <div className="col-md-3">
                                <div className="imageArea">
                                <img
                                    src={image.attachment}
                                    id="img-upload"
                                />
                            </div>
                            <div className="galaryBody">
                                <div className="date">{image.uploaded_at}</div>
                                <div className="deleteImage">
                                    <span className="glyphicon glyphicon-trash" onClick={(e)=>handleDelete(image.id)}></span>
                                </div>
                            </div>
                        </div>
                        )
                    
                    })  
                    }
                </div>
           </div>
        {/* Galary Code Completed */}
        </div>
    )
}


const mapStateToProps = (state) => ({
   galleries : state.Gallery.galleries.data
});

const mapDispatchToProps = {
    addGallery,
    getGallery,
    deleteGallery
}

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);