import { Box, Button, Tooltip, Text } from "@open-pioneer/chakra-integration";
import { SearchIcon } from "../../../../Icons";

interface FeaturePopupProps {
  properties: any;
  onClick: () => void;
  showButton: boolean;
}

export const FeaturePopupContent = ({ properties, onClick, showButton }: FeaturePopupProps) => {
    return (
        <Box
            bg="white"
            p={3}
            borderRadius="md"
            boxShadow="md"
            minW="220px"
            maxW="300px"
            display="flex"
            flexDirection="column"
            gap={1}
        >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontWeight="bold" fontSize="sm">
                    Feature Info
                </Text>
                {showButton && (
                    <Tooltip label="Use extent of this catchment as a search bounding box" placement="top" hasArrow>
                        <Button
                            colorScheme="blue"
                            onClick={onClick}
                            borderRadius="full"
                            p={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <SearchIcon boxSize={4} />
                        </Button>
                    </Tooltip>
                )}
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
                {Object.entries(properties)
                    .filter(([k]) => k !== "geometry")
                    .map(([k, v]) => (
                        <Text key={k} fontSize="xs">
                            <strong>{k}:</strong> {v as string}
                        </Text>
                    ))}
            </Box>
        </Box>
    );
};