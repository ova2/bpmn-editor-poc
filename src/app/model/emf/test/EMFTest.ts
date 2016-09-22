import {XMLProcessor} from "../XMLProcessor";
import {SampleECore} from "../ecore/internal/samples/SampleECore";
import {DOMParser, XMLSerializer} from "xmldom";
import {EMFRegistry} from "../EMFRegistry";

export class EMFTest
{

	testECoreLoader()
	{

		let emfRegistry:EMFRegistry = EMFRegistry.getInstance();

		emfRegistry.addEMFModelFromXML( SampleECore.DIMODEL );
		emfRegistry.addEMFModelFromXML( SampleECore.BPMNDIMODEL );
		emfRegistry.addEMFModelFromXML( SampleECore.DCMODEL );
		emfRegistry.addEMFModelFromXML( SampleECore.BPMN2MODEL );
	}
}
