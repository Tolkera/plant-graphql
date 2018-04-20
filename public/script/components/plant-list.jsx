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

        let list = this.state.plants.map((plant, i)=>{
            return(
                <div className="plant-item" key={plant._id}>
                    <div className="plant-item__grid ">
                        <Link to={plant.name} className=""> {plant.name}</Link>
                    </div>
                    <div className="plant-item__grid">
                        <div className={"status status" + ((i % 3==0) ? "--danger" : '')}  ></div>
                    </div>
                    <div className="plant-item__grid">
                        <span>Watered last {plant.watered} </span>
                    </div>
                    <div className="plant-item__grid">
                        <button className="btn">Water</button>
                    </div>


                </div>
            )
        });

        return(
            <div className="">
                {list}
            </div>

        )
    }
};
