import { injectable } from "inversify";
import {
    ManhattanEdgeRouter, SChildElement, SEdge, SGraphFactory, SLabel, SModelElementSchema,
    SParentElement, EdgePlacement, Expandable, RectangularNode, isEditableLabel
} from "sprotty";


@injectable()
export class RosSystemModelFactory extends SGraphFactory {

    protected initializeChild(child: SChildElement, schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        console.log('initialize child');
        console.log(child);
        super.initializeChild(child, schema, parent);
        if (child instanceof SEdge) {
            child.routerKind = ManhattanEdgeRouter.KIND;
            child.targetAnchorCorrection = Math.sqrt(5)
        } else if (child instanceof SLabel) {
            child.edgePlacement = <EdgePlacement> {
                rotate: true,
                position: 0.6
            }
        }

        return child
    }
}

export class RosComponent extends RectangularNode implements Expandable {
    expanded: boolean = false;

    get editableLabel() {
        const headerComp = this.children.find(element => element.type === 'comp:header');
        if (headerComp) {
            const label = headerComp.children.find(element => element.type === 'label:heading');
            if (label && isEditableLabel(label)) {
                return label;
            }
        }
        return undefined;
    }

    get name() {
        if (this.editableLabel) {
            return this.editableLabel;
        }
        return this.id;
    }
}


