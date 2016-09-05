import {InMemoryDbService} from "angular2-in-memory-web-api";

import uuid from "./../util/uuid";

const id1 = uuid.generate();
const id2 = uuid.generate();
const id3 = uuid.generate();
const id4 = uuid.generate();
const id5 = uuid.generate();
const id6 = uuid.generate();

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let payload = [
            {
                "id": id1,
                "type": "Task",
                "xy": [120, 180],
                "width": 110,
                "height": 80,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "Task 1",
                        "xy": [175, 220]
                    }
                ]
            },
            {
                "id": id2,
                "type": "StartEvent",
                "xy": [40, 180],
                "r": 25,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "Start 1",
                        "xy": [40, 215]
                    }
                ]
            },
            {
                "id": id3,
                "type": "EndEvent",
                "xy": [410, 180],
                "r": 25,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "End 1",
                        "xy": [410, 215]
                    }
                ]
            },
            {
                "id": uuid.generate(),
                "type": "UnidirectConnector",
                "from": id2,
                "to": id1
            },
            {
                "id": uuid.generate(),
                "type": "UnidirectConnector",
                "from": id1,
                "to": id3
            },
            {
                "id": id4,
                "type": "Task",
                "xy": [300, 420],
                "width": 110,
                "height": 80,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "Task 2",
                        "xy": [355, 460]
                    }
                ]
            },
            {
                "id": id5,
                "type": "StartEvent",
                "xy": [220, 610],
                "r": 25,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "Start 2",
                        "xy": [220, 635]
                    }
                ]
            },
            {
                "id": id6,
                "type": "EndEvent",
                "xy": [590, 310],
                "r": 25,
                "children": [
                    {
                        "id": uuid.generate(),
                        "type": "Text",
                        "text": "End 2",
                        "xy": [590, 335]
                    }
                ]
            },
            {
                "id": uuid.generate(),
                "type": "UnidirectConnector",
                "from": id5,
                "to": id4
            },
            {
                "id": uuid.generate(),
                "type": "UnidirectConnector",
                "from": id4,
                "to": id6
            }
        ];

        let metadata = [
            {
                defaults: {
                    "Text": {
                        "alignmentBaseline": "middle",
                        "textAnchor": "middle",
                        "fontSize": 14
                    },
                    "Task": {
                        "width": 110,
                        "height": 80,
                        "rxy": [6, 6],
                        "fill": ["#d2ddfc", "#a099e8"],
                        "stroke": "#000000",
                        "strokeWidth": 1,
                        "fillOpacity": 1.0,
                        "strokeOpacity": 1.0
                    },
                    "StartEvent": {
                        "r": 25,
                        "fill": ["#e4e4d9", "#215f00"],
                        "stroke": "#000000",
                        "strokeWidth": 1,
                        "fillOpacity": 1.0,
                        "strokeOpacity": 1.0
                    },
                    "EndEvent": {
                        "r": 25,
                        "fill": ["#ffc500", "#db4b02"],
                        "stroke": "#000000",
                        "strokeWidth": 1,
                        "fillOpacity": 1.0,
                        "strokeOpacity": 1.0
                    },
                    "UnidirectConnector": {
                        "stroke": "#000000",
                        "strokeWidth": 2,
                        "strokeOpacity": 1.0
                    }
                }
            }
        ];

        return {payload, metadata};
    }
}
