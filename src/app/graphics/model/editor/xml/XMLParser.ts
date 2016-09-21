import {
	SAXParser,
	QualifiedTag,
	QualifiedAttribute
} from "sax";
import {EMFModel} from "../EMFModel";
import {Parser} from "xml2js";
import {ECore} from "../interfaces/EModelElement";
import InstanceLoader = ECore.InstanceLoader;
import EObject = ECore.EObject;
import ECoreFactory = ECore.ECoreFactory;
import EPackage = ECore.EPackage;
import {DOMParser, XMLSerializer} from "xmldom";
import {XMLProcessor} from "./XMLProcessor";




export class XMLParser {

	constructor(emfModel: EMFModel)
	{
		this.test3();
	}

	test3(){

		let xmlParser:DOMParser = new DOMParser();

		let document:Document = xmlParser.parseFromString( this.ECOREMODEL, 'text/xml' );

		let xmlProcessor:XMLProcessor = new XMLProcessor(document);
		// xmlProcessor.dumpNode( document, 0  );
		let xmlSerializer:XMLSerializer = new XMLSerializer();
		let xmlString:string = xmlSerializer.serializeToString(document);

	}

	test2() {
		let xml2jsParser: Parser = new Parser({ mergeAttrs:true, explicitArray:false });


		xml2jsParser.parseString(this.ECOREMODEL, function (err, result) {
			console.dir(result);
			console.log('Done');




			let jsonString: string = JSON.stringify(result);


			let ePackage:EPackage = <EPackage> result["ecore:EPackage"];

			ePackage = new EPackage();

			ECoreFactory.dumpEObject( ePackage, 0 );



			console.log("JSON String: " + jsonString);
		});


	}

	test1(emfModel: EMFModel): void {


		let eContextObject = {};
		this._saxParser = new SAXParser(true, {trim: true, normalize: true, xmlns: true, position: true});


		this._saxParser.onerror = function (e: Error) {
			console.log("SAX Error: " + e.name + " " + e.message);
		};

		this._saxParser.ontext = function (text: string) {
			// console.log("SAX Text: " + text);
		};

		this._saxParser.onopentag = function (qualifiedTag: QualifiedTag) {
			console.log("SAX Open '" + qualifiedTag.name);

			let eObject: EObject = ECoreFactory.createInstance(qualifiedTag.local);

			let eObjectType:string = typeof eObject;
			console.log("Created EObject of Type: " + eObjectType);

			console.log(" Local: " + qualifiedTag.local);
			console.log(" Prefix: " + qualifiedTag.prefix);
			console.log(" URI: " + qualifiedTag.uri);

			if (qualifiedTag.attributes != null) {
				for (let attribute in qualifiedTag.attributes) {
					let value: QualifiedAttribute = qualifiedTag.attributes[attribute];
					console.log(" Attribute " + attribute + " " + value.value);
					eObject[attribute] = value.value;
				}
			}
		}


		this._saxParser.onclosetag = function (tagName: string) {
			console.log("SAX Close '" + tagName);
		}

		this._saxParser.onend = function () {
			// console.log("SAX On End: ");
		};

		this
			._saxParser
			.write(this

				.ECOREMODEL).close();

	}

	private _saxParser: SAXParser;

	private XMLTESTDATA: string = `<?xml version="1.0" encoding="UTF-8"?>
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


	private ECOREMODEL: string = `
<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0"
    xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" name="dc"
    nsURI="http://www.omg.org/spec/DD/20100524/DC-XMI" nsPrefix="dc">
  <eClassifiers xsi:type="ecore:EClass" name="DocumentRoot">
    <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
      <details key="name" value=""/>
      <details key="kind" value="mixed"/>
    </eAnnotations>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="mixed" unique="false" upperBound="-1"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFeatureMapEntry">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="elementWildcard"/>
        <details key="name" value=":mixed"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EReference" name="xMLNSPrefixMap" upperBound="-1"
        eType="ecore:EClass http://www.eclipse.org/emf/2002/Ecore#//EStringToStringMapEntry"
        transient="true" containment="true" resolveProxies="false">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="xmlns:prefix"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EReference" name="xSISchemaLocation" upperBound="-1"
        eType="ecore:EClass http://www.eclipse.org/emf/2002/Ecore#//EStringToStringMapEntry"
        transient="true" containment="true" resolveProxies="false">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="xsi:schemaLocation"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EReference" name="bounds" upperBound="-2"
        eType="#//Bounds" volatile="true" transient="true" derived="true" containment="true"
        resolveProxies="false">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="element"/>
        <details key="name" value="Bounds"/>
        <details key="namespace" value="http://www.omg.org/spec/DD/20100524/DC"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EReference" name="font" upperBound="-2" eType="#//Font"
        volatile="true" transient="true" derived="true" containment="true" resolveProxies="false">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="element"/>
        <details key="name" value="Font"/>
        <details key="namespace" value="http://www.omg.org/spec/DD/20100524/DC"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EReference" name="point" upperBound="-2"
        eType="#//Point" volatile="true" transient="true" derived="true" containment="true"
        resolveProxies="false">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="element"/>
        <details key="name" value="Point"/>
        <details key="namespace" value="http://www.omg.org/spec/DD/20100524/DC"/>
      </eAnnotations>
    </eStructuralFeatures>
  </eClassifiers>
  <eClassifiers xsi:type="ecore:EClass" name="Bounds">
    <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
      <details key="name" value="Bounds"/>
      <details key="kind" value="empty"/>
    </eAnnotations>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="height" ordered="false"
        lowerBound="1" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="height"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="width" ordered="false"
        lowerBound="1" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="width"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="x" ordered="false" lowerBound="1"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat" defaultValueLiteral="0">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="x"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="y" ordered="false" lowerBound="1"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat" defaultValueLiteral="0">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="y"/>
      </eAnnotations>
    </eStructuralFeatures>
  </eClassifiers>
  <eClassifiers xsi:type="ecore:EClass" name="Font">
    <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
      <details key="name" value="Font"/>
      <details key="kind" value="empty"/>
    </eAnnotations>
    <eOperations name="non_negative_size" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean">
      <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
        <details key="documentation" value="size >=  0"/>
      </eAnnotations>
      <eParameters name="diagnostics" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EDiagnosticChain">
        <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
          <details key="documentation" value="The chain of diagnostics to which problems are to be appended."/>
        </eAnnotations>
      </eParameters>
      <eParameters name="context">
        <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
          <details key="documentation" value="The cache of context-specific information."/>
        </eAnnotations>
        <eGenericType eClassifier="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EMap">
          <eTypeArguments eClassifier="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EJavaObject"/>
          <eTypeArguments eClassifier="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EJavaObject"/>
        </eGenericType>
      </eParameters>
    </eOperations>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="isBold" ordered="false"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="isBold"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="isItalic" ordered="false"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="isItalic"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="isStrikeThrough" ordered="false"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="isStrikeThrough"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="isUnderline" ordered="false"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="isUnderline"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="name" ordered="false" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="name"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="size" ordered="false" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="size"/>
      </eAnnotations>
    </eStructuralFeatures>
  </eClassifiers>
  <eClassifiers xsi:type="ecore:EClass" name="Point">
    <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
      <details key="name" value="Point"/>
      <details key="kind" value="empty"/>
    </eAnnotations>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="x" ordered="false" lowerBound="1"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat" defaultValueLiteral="0">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="x"/>
      </eAnnotations>
    </eStructuralFeatures>
    <eStructuralFeatures xsi:type="ecore:EAttribute" name="y" ordered="false" lowerBound="1"
        eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat" defaultValueLiteral="0">
      <eAnnotations source="http:///org/eclipse/emf/ecore/util/ExtendedMetaData">
        <details key="kind" value="attribute"/>
        <details key="name" value="y"/>
      </eAnnotations>
    </eStructuralFeatures>
  </eClassifiers>
</ecore:EPackage>

	`;

}
