import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { addGallery, getGallery, deleteGallery } from "../../store/Actions/Gallery";
import { NotificationManager } from "react-notifications";
import Slider from "react-slick";

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
        tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
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
        tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
        caption: "Boats (Jeshu John - designerspics.com)"
    },

    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
    }]


const Galleries = (props) => {
    console.log('props.gallery', props)
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    const [id, setId] = useState('');
    const [attachment, setAttachment] = useState('');
    const [album_name, setAlbum_name] = useState('group_1');
    const [download, setDownload] = useState('');
    const [docName, setDocName] = useState('');
    const [house_id, setHouse_id] = useState(houseId);
    const [groupname, setGroupname] = useState('');
    // const [groupType, setGroupType] = useState('group_1');
    const [groupTypeOption, setGroupTypeOption] = useState('group_1');
    const [active, setActive] = useState("Home");

    useEffect(() => {
        if (attachment) {
            var form = new FormData();
            form.append('id', id);
            form.append('house_id', house_id);
            form.append("attachment", attachment);
            form.append("album_name", album_name);
            console.log('form', form)
            props.addGallery(form);
            setAttachment("");
        }
    }, [attachment]);

    // useEffect(()=> {
    //     // var form = new FormData();
    //     // form.append('id', id);
    //     // form.append('house_id', house_id);
    //     // form.append("album_name", album_name);
    //     props.getGallery({album_name : album_name, house_id: house_id});
    // }, [album_name]);

    useEffect(() => {
        console.log("groupTypeOption",groupTypeOption)
        // var form = new FormData();
        // form.append('id', id);
        // form.append('house_id', house_id);
        // form.append("album_name", groupTypeOption);
        props.getGallery({ album_name: groupTypeOption, house_id: house_id });
    }, [groupTypeOption])

    const handleDocumentUpload = (event) => {
        setAttachment(event.target.files[0])
        // setAlbum_name(event.target.files[0]['groupType'])
        // setGroupname(event.target.files[0]['name']);
        // setGroupType(groupType);
        // setGroupOption(event.target.value);
    }

    const handleAlbumsChange = (e) => {
        setGroupTypeOption(e.target.value);
    }

    const handleDelete = (id) => {
        props.deleteGallery({ id: id, house_id: house_id, album_name: groupTypeOption });
        // NotificationManager.error("Success Message", "Attachment deleted");
    }

    const handleDocType = (type) => {
        setActive(type);
        let doc = [];
        if (props.links && props.links.length > 0) {
            for (let i = 0; i < props.links.length; i++) {
                if (props.links[i]["category"] == type) {
                    doc.push(props.links[i]);
                }
            }
        }
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: props.galleries !== undefined && props.galleries.length > 3 ? 3 : props.galleries !== undefined && props.galleries.length,
        slidesToScroll: 3
    };
    return (
        <div className="container-fluid loan">
            <h4>Gallery</h4>
            <div className="contact-form">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Home" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Home")}>Home</span>
                        <span className={active === "Personal" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Personal")}>Personal</span>
                        <span className={active === "Other" ? "active-bar mr-50" : "mr-50"} onClick={(e) => handleDocType("Other")}>Other</span>
                    </div>
                </div>
                <div className="row " style={{ marginTop: "2%" }}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="radio" id="group_1" name="groupType" value="group_1" onChange={e => {
                                setAlbum_name(e.target.value)
                                setGroupname("Select");
                            }} checked={album_name == "group_1" ? "checked" : ""} />
                            {console.log("groupType", album_name)}
                            &nbsp;
                            <label htmlFor="group_1">Group-1</label>
                            &nbsp;&nbsp;
                            <input type="radio" id="group_2" name="groupType" value="group_2" onChange={e => {
                                setGroupname("Select");
                                setAlbum_name(e.target.value)
                            }} checked={album_name == "group_2" ? "checked" : ""} />
                            &nbsp;<label htmlFor="group_2">Group-2</label><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment">Select Image</label>
                            <label htmlFor="file" className="fileContainer">
                                <div className="attachfile" align="center">
                                    <i>Click here to attach Image</i>
                                    <p>{docName ? docName : ""}</p>

                                </div>
                                <input type="file" style={{ height: "0px" }} id="file" onChange={(event) => handleDocumentUpload(event)} className="form-control" style={{ "visibility": "hidden" }} accept="audio/*,video/*,image/*" />
                            </label>
                        </div>
                    </div>

                    {/* <div className="col-md-2" style={{marginTop: "2%"}}>
                        <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                        <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="Albums">Albums</label>
                            <select className="form-control" value={groupTypeOption} onChange={e => handleAlbumsChange(e)} >
                                <option value="" disabled>Select</option>
                                <option value="group_1">Group-1</option>
                                <option value="group_2">Group-2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>

            {/* *Galary Code */}
                <div className="contact-form galary">
                    <h4>{groupTypeOption === "group_1" ? "Group 1" : "Group 2"} </h4>
                    {console.log("props.galleries::",props.galleries)}
                    <div className="row">
                        <Slider {...settings}>
                            {
                                props.galleries !== undefined && props.galleries.map((image) => {
                                    return (
                                        <div className="col-md-3">
                                            <div className="imageArea">
                                                <img src={image.attachment} id="img-upload"/>
                                            </div>
                                            <div className="galaryBody">
                                                <div className="date">{image.uploaded_at}</div>
                                                <div className="deleteImage">
                                                    <span className="glyphicon glyphicon-trash" onClick={(e) => handleDelete(image.id)}></span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    </div>
                        









            {/* Galary Code Completed */}
        </div>
    )
}


const mapStateToProps = (state) => (
    console.log("state.Gallery", state.Gallery.galleries.data),
    {
        galleries: state.Gallery.galleries.data
    });

const mapDispatchToProps = {
    addGallery,
    getGallery,
    deleteGallery
}

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);