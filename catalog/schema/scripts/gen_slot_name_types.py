import sys
import os.path
import re
from linkml_runtime import SchemaView

def gen_slot_name_type(schema_path):
  schemaview = SchemaView(schema_path)
  slot_names = schemaview.all_slots().keys()
  schema_name = os.path.splitext(os.path.basename(schema_path))[0]
  camel_schema_name = re.sub("(?:^|_)(.)", lambda m: m.group(1).upper(), schema_name)
  return f"export type {camel_schema_name}SlotName ={"".join(f'\n  | "{name}"' for name in slot_names)};"

def gen_slot_name_types(schema_paths):
  return "\n\n".join(gen_slot_name_type(path) for path in schema_paths) + "\n"

if __name__ == "__main__":
  print(gen_slot_name_types(sys.argv[1:]), end="")
