import React, {Component} from 'react'

class Hello extends Component
{
    constructor(){
        super()
        this.state={
            message:'Hello there'
        }
    }
    change(){
        this.setState({
            message : 'Thank you'

        })

    }
    render()
    {
        return(
            <div>
            <h1>{this.state.message}</h1>
            <button onClick={()=>this.change()}>Subscribe</button>
            </div>
        )
    }
}
export default Hello;