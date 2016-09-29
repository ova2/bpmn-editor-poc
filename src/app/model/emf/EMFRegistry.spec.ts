import {EMFRegistry} from "./EMFRegistry";
import {EPackage} from "./ecore/EPackage";

describe("app/model/emf/EMFRegistry", () => {
    let emfRegistry: EMFRegistry;

    beforeEach(() => {
        emfRegistry = EMFRegistry.getInstance();
    });

    it("empty package should be returned as undefined", () => {
        let ePackage: EPackage = emfRegistry.getPackage("");
        
        // verify
        expect(ePackage).toBeUndefined();
    });
    
    it("valid package should exist and have not empty name", () => {
        let ePackage: EPackage = emfRegistry.getPackage("http://www.eclipse.org/emf/2002/Ecore");
        
        // verify
        expect(ePackage).not.toBeNull();
        expect(ePackage).not.toBeUndefined();
        expect(ePackage.name).toBe("ecore");
    });

});
