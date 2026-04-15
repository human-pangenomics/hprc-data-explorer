from dataclasses import dataclass, asdict
import json
from build_help import get_file_error_strings

@dataclass
class InputFileErrors:
  filename: str
  errors: list[str]

@dataclass
class UriError:
  uri: str
  message: str

@dataclass
class EntityTypeReport:
  validation_errors: list[InputFileErrors]
  file_uri_errors: list[UriError] | None = None
  def save_to(self, file_path):
    with open(file_path, "w") as f:
      json.dump(asdict(self), f)

def get_error_strings_for_file(filename, errors):
  return InputFileErrors(filename, get_file_error_strings(errors))

def get_error_strings_per_file(errors_by_file):
  return [get_error_strings_for_file(filename, errors) for filename, errors in errors_by_file.items()]

def make_uri_error_accumulator():
  errors = []
  def handle_error(uri, message):
    errors.append(UriError(uri, message))
  return handle_error, errors
