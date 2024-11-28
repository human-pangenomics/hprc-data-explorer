import yaml


def validate_slots(schema_file):
    with open(schema_file, "r") as file:
        schema = yaml.safe_load(file)

    defined_slots = set(schema.get("slots", {}).keys())
    for class_name, class_info in schema.get("classes", {}).items():
        for slot in class_info.get("slots", []):
            if slot not in defined_slots:
                print(
                    f"\033[91mError: Slot '{slot}' in class '{class_name}' is not defined in the slots section. ❌\033[0m"
                )


validate_slots("hprc-catalog-schema.yaml")
