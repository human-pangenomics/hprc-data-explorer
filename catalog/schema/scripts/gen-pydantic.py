import sys

from linkml.generators.pydanticgen import PydanticGenerator

# The source for the base Pydantic generator can be found at https://github.com/linkml/linkml/tree/main/linkml/generators/pydanticgen

"""
LinkML Pydantic generator extended to prevent slots from being given default values.
"""
class PydanticGeneratorExtended(PydanticGenerator):
    def generate_slot(self, slot, cls):
        result = super().generate_slot(slot, cls)
        result.attribute.predefined = "..."
        return result


if __name__ == "__main__":
    print(PydanticGeneratorExtended(sys.argv[1], extra_fields="ignore").serialize())
