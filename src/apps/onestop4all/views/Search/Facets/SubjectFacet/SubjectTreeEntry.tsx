import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    SystemStyleObject
} from "@open-pioneer/chakra-integration";

import { DropdownArrowIcon } from "../../../../components/Icons";
import { SelectableSubject, useSearchState } from "../../SearchState";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export interface SubjectTreeEntryProps {
    entry: SelectableSubject;
}

export function SubjectTreeEntry(props: SubjectTreeEntryProps) {
    const expanded = false;
    const { entry } = props;
    const searchState = useSearchState();

    function subjectToggled(checked: boolean, subject: string) {
        if (checked) {
            searchState.setSelectedSubjects([...searchState.selectedSubjects, subject]);
        } else {
            searchState.setSelectedSubjects(
                searchState.selectedSubjects.filter((e) => e !== subject)
            );
        }
    }

    function getIconStyles(expanded: boolean): SystemStyleObject {
        return {
            transform: expanded ? "rotate(-180deg)" : undefined,
            transition: "transform 0.2s",
            transformOrigin: "center"
        };
    }

    return (
        <Accordion allowMultiple defaultIndex={expanded ? [0] : []}>
            <AccordionItem border="0px">
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            _hover={{ bg: "white" }}
                            gap="8px"
                            position="relative"
                            padding="0"
                            textAlign="left"
                        >
                            <Box paddingRight="50px">
                                <FacetCheckbox
                                    label={entry.label}
                                    isChecked={entry.selected}
                                    onChange={(event) =>
                                        subjectToggled(event.target.checked, entry.label)
                                    }
                                ></FacetCheckbox>
                            </Box>
                            <DropdownArrowIcon
                                position="absolute"
                                right="12px"
                                bg="white"
                                padding="0 6px"
                                boxSize="7"
                                __css={getIconStyles(isExpanded)}
                            ></DropdownArrowIcon>
                        </AccordionButton>
                        <AccordionPanel padding="0px" paddingLeft="20px" paddingInlineEnd="0px">
                            {entry.children.map((e, i) => {
                                return e.children.length > 0 ? (
                                    <SubjectTreeEntry key={i} entry={e}></SubjectTreeEntry>
                                ) : (
                                    <Box paddingRight="50px" key={i}>
                                        <FacetCheckbox
                                            label={e.label}
                                            isChecked={e.selected}
                                            onChange={(event) =>
                                                subjectToggled(event.target.checked, e.label)
                                            }
                                        ></FacetCheckbox>
                                    </Box>
                                );
                            })}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}
