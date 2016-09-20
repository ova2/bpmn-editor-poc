import {SAXParser} from "sax";
export class XMLParser
{

	constructor()
	{
		this._saxParser = new SAXParser(true, { trim:true, normalize: true, lowercase: false, xmlns: true, position:true, strictEntities:false } );

		this._saxParser.onerror = function (e)
		{
			console.log("SAX Error: " + e);
		};

		this._saxParser.ontext = function (t)
		{
			console.log("SAX Text: " + t);
		};

		this._saxParser.onopentag = function (node)
		{
			console.log("SAX Open Tag: " + node);
		};

		this._saxParser.onattribute = function (attr)
		{
			console.log("SAX On Attribute: " + attr);
		};
		this._saxParser.onend = function ()
		{
			console.log("SAX On End: ");
		};

		this._saxParser.write( this.XMLTESTDATA).close();

	}

	private _saxParser:SAXParser;

	const XMLTESTDATA:string =
	`<?xml version="1.0" encoding="UTF-8"?>
	<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:inspire="http://bpminspire.com/bpmn2/extension/inspire" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/20100524/MODEL-XMI http://www.omg.org/spec/DD/20100524/DI http://www.omg.org/spec/DD/20100524/DI-XMI http://www.omg.org/spec/DD/20100524/DC http://www.omg.org/spec/DD/20100524/DC-XMI http://www.omg.org/spec/BPMN/20100524/DI http://www.omg.org/spec/BPMN/20100524/DI-XMI" id="FE0080003A44EC4AAA298000000000000000" inspire:extensionVersion="2.4" expressionLanguage="http://www.w3.org/1999/XPath" typeLanguage="http://www.w3.org/2001/XMLSchema">
	<bpmn2:process id="FE0080003A44ECBE264C8000000000000004" name="Wait" isExecutable="true" processType="None">
	<bpmn2:extensionElements>
<inspire:DeploymentProperties retentionTime="0" basePriority="5" gotoPermissionMode="USER" useNewMethodNaming="true"/>
	<inspire:AnchoredPosition anchor="SOURCE" referenceAlignment="CENTER_CENTER" labelAlignment="TOP_LEFT"/>
	</bpmn2:extensionElements>
<bpmn2:startEvent id="FE0080003A44ED07483B8000000000000005" name="Start" isInterrupting="true">
	<bpmn2:extensionElements>
<inspire:DeploymentProperties retentionTime="0" basePriority="5" gotoPermissionMode="USER" startEventDefault="true"/>
	<inspire:MultilanguageString>
<values key="Default" value="Start"/>
	</inspire:MultilanguageString>
<inspire:AttributeMap>
<valueMap key="stepName" value="Start"/>
	</inspire:AttributeMap>
<inspire:AnchoredPosition anchor="SOURCE" referenceAlignment="CENTER_CENTER" labelAlignment="TOP_LEFT" referenceOffsetX="-8.0" referenceOffsetY="22.0"/>
	</bpmn2:extensionElements>
<bpmn2:outgoing>C067A8028AA4D343708000000000000427</bpmn2:outgoing>
</bpmn2:startEvent>
<bpmn2:endEvent id="FE0080003A44EE1B2A28800000000000000B" name="End">
	<bpmn2:extensionElements>
<inspire:MultilanguageString>
<values key="Default" value="End"/>
	</inspire:MultilanguageString>
<inspire:AttributeMap>
<valueMap key="stepName" value="End"/>
	</inspire:AttributeMap>
<inspire:AnchoredPosition anchor="SOURCE" referenceAlignment="CENTER_CENTER" labelAlignment="TOP_LEFT" referenceOffsetX="-7.0" referenceOffsetY="22.0"/>
	</bpmn2:extensionElements>
<bpmn2:incoming>C067A8028B516A570A8000000000000444</bpmn2:incoming>
</bpmn2:endEvent>
<bpmn2:dataObject id="FE0080003A44EEBAF4A28000000000000012" name="BPM inspire Variables" isCollection="true">
	<bpmn2:extensionElements>
<inspire:VariableDefinitions>
<inspire:VariableDefinition Name="Variable" Type="STRING">
<description>
	<values key="Default" value="Description of Variable"/>
	</description>
	</inspire:VariableDefinition>
</inspire:VariableDefinitions>
</bpmn2:extensionElements>
</bpmn2:dataObject>
<bpmn2:intermediateCatchEvent id="C067A80287DAB8E54C80000000000003DA" name="IntermediateCatchEvent">
	<bpmn2:extensionElements>
<inspire:AttributeMap>
<valueMap key="stepName" value="IntermediateCatchEvent"/>
	</inspire:AttributeMap>
<inspire:AnchoredPosition anchor="SOURCE" referenceAlignment="CENTER_CENTER" labelAlignment="TOP_LEFT"/>
	</bpmn2:extensionElements>
<bpmn2:incoming>C067A8028AA4D343708000000000000427</bpmn2:incoming>
<bpmn2:outgoing>C067A8028B516A570A8000000000000444</bpmn2:outgoing>
<bpmn2:timerEventDefinition id="C067A8028CB65511A28000000000000447">
	<bpmn2:timeDuration xsi:type="inspire:StringExpression" id="C067A8029014C9E42E8000000000000448" expression="PT10S"/>
	</bpmn2:timerEventDefinition>
</bpmn2:intermediateCatchEvent>
<bpmn2:sequenceFlow id="C067A8028AA4D343708000000000000427" sourceRef="FE0080003A44ED07483B8000000000000005" targetRef="C067A80287DAB8E54C80000000000003DA"/>
	<bpmn2:sequenceFlow id="C067A8028B516A570A8000000000000444" sourceRef="C067A80287DAB8E54C80000000000003DA" targetRef="FE0080003A44EE1B2A28800000000000000B"/>
	</bpmn2:process>
<bpmndi:BPMNDiagram id="FE0080003A44EC75D02A8000000000000002" name="Wait">
	<bpmndi:BPMNPlane id="FE0080003A44EC9642198000000000000003" bpmnElement="FE0080003A44ECBE264C8000000000000004">
	<bpmndi:BPMNShape id="FE0080003A44ED44ACB08000000000000006" bpmnElement="FE0080003A44ED07483B8000000000000005">
	<dc:Bounds height="35.0" width="35.0" x="80.5" y="80.5"/>
	<bpmndi:BPMNLabel id="FE0080003A44ED53857B8000000000000007">
	<dc:Bounds height="10.0" width="16.0" x="90.0" y="125.0"/>
	</bpmndi:BPMNLabel>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="FE0080003A44EE1E8AE2800000000000000C" bpmnElement="FE0080003A44EE1B2A28800000000000000B">
	<dc:Bounds height="35.0" width="35.0" x="582.5" y="182.5"/>
	<bpmndi:BPMNLabel id="FE0080003A44EE1F2ED5800000000000000D"/>
	</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="FE0080003A44EEC8250F8000000000000013" bpmnElement="FE0080003A44EEBAF4A28000000000000012">
	<dc:Bounds height="41.0" width="31.0" x="14.5" y="29.5"/>
	<bpmndi:BPMNLabel id="FE0080003A44EEC934268000000000000014"/>
	</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="C067A80287FF698E84800000000000040D" bpmnElement="C067A80287DAB8E54C80000000000003DA">
	<dc:Bounds height="35.0" width="35.0" x="334.0" y="118.0"/>
	</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="C067A8028AA4D499188000000000000428" bpmnElement="C067A8028AA4D343708000000000000427" sourceElement="FE0080003A44ED44ACB08000000000000006" targetElement="C067A80287FF698E84800000000000040D">
	<di:waypoint x="98.0" y="115.5"/>
	<di:waypoint x="98.0" y="135.5"/>
	<di:waypoint x="334.0" y="135.5"/>
	</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="C067A8028B516BAD6E8000000000000445" bpmnElement="C067A8028B516A570A8000000000000444" sourceElement="C067A80287FF698E84800000000000040D" targetElement="FE0080003A44EE1E8AE2800000000000000C">
	<di:waypoint x="351.5" y="153.0"/>
	<di:waypoint x="351.5" y="200.0"/>
	<di:waypoint x="582.5" y="200.0"/>
	</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

}
