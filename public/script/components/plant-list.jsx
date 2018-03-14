import React from 'react';
import { Link} from 'react-router-dom';

module.exports = class PlantList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            plants: []
        }
    }

    componentDidMount(){
        fetch('/graphql?query={allPlants{name, _id}}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                res.json().then((res)=>{
                    console.log(res.data);
                    this.setState({plants: res.data.allPlants});
                });


            })
            .then(res => console.log(res))
    }

    render(){

        let list = this.state.plants.map((plant)=>{
            return(
                <div className="plant-item" key={plant._id}>
                <span>{plant.name} </span> <Link to={plant.name}> {plant.name}</Link>
                </div>
            )
        })

        return(
            <div className="">
                {list}
            </div>

        )
    }
};
