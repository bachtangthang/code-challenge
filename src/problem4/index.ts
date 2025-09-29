// summation from 1 to n ->> n > = 1
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
  // Complexity: O(1), space: O(1)
}

function sum_to_n_b(n: number): number {
  let sum: number = 0;
  for (let i: number = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
  // Complexity: O(n), space: 0(1)
}

function sum_to_n_c(n: number): number {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
  // Complexity: O(n), space: O(n)
}
