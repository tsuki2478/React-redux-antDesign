import React from 'react'
import 'nprogress/nprogress.css'

 class App extends React.Component {

    render() {
        return ( 
            <div style={{height:'100%'}}>
             { this.props.children} 
            </div>
        );
    }
}

export default App;