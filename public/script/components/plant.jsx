import React from 'react';
import { Link} from 'react-router-dom';

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



                <div className="flex-wrap">
                    <div className="plant-item plant-item--card plant-item--attention">
                        <span className="label">Purchased:</span>{purchased} <br/>
                        <span className="label">Seller:  </span>{seller}  <br/>
                        <span className="label">Price:  </span>10  <br/>
                    </div>
                    <div className="plant-item plant-item--card plant-item">
                        <span className="label">More info:</span> <br/>
                        <span className="label">Less info:  </span> <br/>
                    </div>
                    </div>
                <div className="flex-wrap">
                    <div className="plant-item plant-item--card plant-item--success">
                        <span className="label">First growth:</span>100cm <br/>
                        <span className="label">Current:  </span> 120cm <br/>
                    </div>
                    <div className="plant-item plant-item--card plant-item--danger">
                        <span className="label">Water:</span> 1 per week<br/>
                        <span className="label">Sun:  </span> a lot <br/>
                    </div>
                </div>

                <div>
                    <Link to="/"> Back to all</Link>
                </div>
            </div>

        )
    }
};
