import pandas as pd
import os


def process_alignments():
    """
    Reads 'source/alignments.csv', processes columns including 'version', 'reference_coordinates',
    and adds an 'alignment' column. Special cases:
    - If 'pipeline' is 'minigraph-cactus', use 'mc' instead of the pipeline name in 'alignment'.
    - Skip determining 'reference_coordinates' if the file name contains 'all'.
    Writes the result to 'source/alignments2.csv'.
    """
    # Define the directory and file paths
    directory = "source"
    input_file = os.path.join(directory, "alignments.csv")
    output_file = os.path.join(directory, "alignments2.csv")

    try:
        # Read the alignments file into a DataFrame
        df = pd.read_csv(input_file)

        # Ensure the necessary columns exist
        if "file" not in df.columns:
            raise ValueError("The input file must have a 'file' column.")
        if "pipeline" not in df.columns:
            raise ValueError("The input file must have a 'pipeline' column.")
        if "reference_coordinates" not in df.columns:
            # If the 'reference_coordinates' column doesn't exist, add it
            df["reference_coordinates"] = ""

        # Define a function to determine the version
        def determine_version(file_name):
            if "v1.0" in file_name:
                return "v1.0"
            elif "v1.1" in file_name:
                return "v1.1"
            else:
                return ""

        # Define a function to extract reference coordinates from the file name
        def extract_reference_coordinates(file_name):
            if "all" in file_name.lower():
                return ""  # Skip if 'all' is in the file name
            if "chm13" in file_name:
                return "chm13"
            elif "grch38" in file_name:
                return "grch38"
            else:
                return ""

        # Add the 'version' column
        df["version"] = df["file"].apply(determine_version)

        # Update 'reference_coordinates' where 'pipeline' is 'pggb' and 'all' is not in the file name
        df.loc[df["pipeline"] == "pggb", "reference_coordinates"] = df.loc[
            df["pipeline"] == "pggb", "file"
        ].apply(extract_reference_coordinates)

        # Define a function to build the 'alignment' column
        def build_alignment(row):
            # Use 'mc' instead of 'minigraph-cactus' for the pipeline
            pipeline_value = (
                "mc" if row["pipeline"] == "minigraph-cactus" else row["pipeline"]
            )
            base = f"hprc-{row['version']}-{pipeline_value}"
            if row["reference_coordinates"]:
                return f"{base}-{row['reference_coordinates']}"
            return base

        # Add the 'alignment' column
        df["alignment"] = df.apply(build_alignment, axis=1)

        # Write the updated DataFrame to the output file
        df.to_csv(output_file, index=False)
        print(f"Processed file successfully written to '{output_file}'")
    except FileNotFoundError:
        print(f"Error: The input file '{input_file}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


# Run the function
if __name__ == "__main__":
    process_alignments()
