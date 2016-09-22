
import {SampleECore} from "../ecore/internal/samples/SampleECore";
import {EMFRegistry} from "../EMFRegistry";
import {EObject} from "../ecore/EObject";

export class EMFTest
{

	testECoreLoader()
	{

		let emfRegistry:EMFRegistry = EMFRegistry.getInstance();

		emfRegistry.addEMFModelFromXML( SampleECore.MYMODEL );
		//emfRegistry.addEMFModelFromXML( SampleECore.DIMODEL );
		//emfRegistry.addEMFModelFromXML( SampleECore.BPMNDIMODEL );
		//emfRegistry.addEMFModelFromXML( SampleECore.DCMODEL );
		//emfRegistry.addEMFModelFromXML( SampleECore.BPMN2MODEL );

		emfRegistry.showAllPackages(0);
	}
}
