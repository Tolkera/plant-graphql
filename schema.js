const types = require('graphql/type');

const PlantMongo = require('./mongoose');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
    } = types;

function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
}

var plantType = new GraphQLObjectType({
    name: "plant",
    description: "plant item",
    fields: () => ({
        //itemId: {
        //    type: (GraphQLInt),
        //    description: 'The id of the plant.'
        //},
        name: {
            type: GraphQLString,
            description: "The name of the plant."
        },

        color: {
            type: GraphQLString,
            description: "The color of the plant."
        },
        watered: {
            type: GraphQLString,
            description: "when is the last time watered?"
        }
    })
});

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            allPlants: {
                type: new GraphQLList(plantType),
                resolve: (root, {}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        PlantMongo.find({}, projections,(err, plants) => {
                            err ? reject(err) : resolve(plants)
                        })
                    })

                    return foundItems
                }
            },
            plant: {
                type: new GraphQLList(plantType),
                args: {
                    name: {
                        name: "name",
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {name}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        PlantMongo.find({"name": name}, projections,(err, plants) => {
                            err ? reject(err) : resolve(plants)
                        })
                    })

                    return foundItems
                }
            }
        }
    })

});


module.exports = {
    schema: schema,
    getProjection: getProjection
}

