use std::fs;

fn main() {
    fn value_of_num(val: &u8) -> Option<u8> {
        match val {
            b'0' => Some(0),
            b'1' => Some(1),
            b'2' => Some(2),
            b'3' => Some(3),
            b'4' => Some(4),
            b'5' => Some(5),
            b'6' => Some(6),
            b'7' => Some(7),
            b'8' => Some(8),
            b'9' => Some(9),
            _ => None
        }
    }

    fn get_lines(input: &str) -> Vec<&str> {
        input.lines().collect()
    }

    fn check_for_nums(line: &str) -> Vec<u8> {
        let bytes = line.as_bytes();
        let mut nums: Vec<u8>  = vec![];

        for (i, &item) in bytes.iter().enumerate() {
            if let Some(num) = value_of_num(&item) {
                if Some(num).is_some() {
                    if i == 0 {
                        nums.push(num);
                    } else {
                        nums.push(num);
                    }
                }
            }
        }
        nums
    }
    let file_path = "./input.txt";

    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    let lines = get_lines(&contents);

    let mut sum_of_lines: Vec<String> = vec![];

    for (_i, line) in lines.iter().enumerate() {
        let result = check_for_nums(&line);
        let my_first = result[0];
        let my_last = result[result.len() - 1];
        let data = my_first.to_string() + &my_last.to_string();
        sum_of_lines.push(data)
    }

    fn get_total_sum(sums: &Vec<String>) -> u32 {
        let mut total_sum: u32 = 0;
        for (_i, item) in sums.iter().enumerate() {
            total_sum += item.parse::<u32>().unwrap();
        }
        total_sum
    }

    let result = get_total_sum(&sum_of_lines);

    println!("result: {}", result);
}