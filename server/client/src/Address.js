import React, { Component } from 'react';

class Address extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="container">
                        <div className="jumbotron">
                            <h1>שמור על קשר</h1><br/>
                            <h2>כתובתינו</h2>      
                            <p>רח' בן יהודה 14 שדרות</p>
                            <p >
                                <a href="https://tinyurl.com/u4d8689">
                                    <img className="icon2" alt="waze" src="/images1/waze.jpg"></img>
                                </a> :נווט עם  
                            </p>    
                            <h2 className="rtl">:טלפון</h2>      
                            <p>050-633-6828</p>
                            <p>08-68-99-600</p>    
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Address;