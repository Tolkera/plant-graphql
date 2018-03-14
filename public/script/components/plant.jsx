import React from 'react';

module.exports = class Plant extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            plant: {}
        }
    }

    componentDidMount(){
        fetch('/graphql?query={plant(name:"' + this.props.match.params.id +'"){_id, name, seller, purchased, watered}}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then((res)=>{
                    this.setState({plant: res.data.plant});
                });
            })
            .then(res => console.log(res))
    }

    render(){

       let {name, seller, purchased} = this.state.plant;
        return(
            <div className="">
                Plant {name}
                <br/>
                <br/>

                Purchased around {purchased} at {seller} <br/> <br/>
            </div>

        )
    }
};
