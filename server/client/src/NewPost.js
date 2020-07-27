import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import axios from "axios"; 
class NewPost extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            text: '<p>הקלד את הפוסט כאן</p>',
            title: "",
            isPosted: null
        };

        this.handleChange = this.handleChange.bind( this );
        this.onEditorChange = this.onEditorChange.bind( this );
    }
    onEditorChange( evt ) {
        this.setState( {
            text: evt.editor.getData()
        } );
    }

    handleChange( changeEvent ) {
        this.setState( {
            text: changeEvent.target.value
        } );
    }
    postTheArticle = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.props.key1}` }
        };
        this.state.title && this.state.text && 
    
        axios
          .post("/insertNewPost",{text:this.state.text, title:this.state.title }, config)
          .then((res) => {
          this.setState({ isPosted: "ok" ,text: "", title: ""});
          })
          .catch((err) => console.log(err));
    }
    render() {
   let writenewpost = <div className="App2 container"  >
    <h2>כתיבת פוסט</h2>
   <p><input onChange={(event)=> this.setState({ title: event.target.value })}></input> : שם הפוסט  </p>
    <CKEditor 
        text={this.state.text}
        onChange={this.onEditorChange} />
        <br/>
        <button onClick={()=>this.postTheArticle()}>פרסם את הפוסט</button>
</div> ;
        return (
            <div>
            {this.state.isPosted === null ? writenewpost : <div><h3>הפוסט פורסם בהצלחה</h3><button onClick={() => this.setState({ isPosted: null })}>פרסם פוסט נוסף</button></div>}
            </div>
        );
    }
}

export default NewPost;