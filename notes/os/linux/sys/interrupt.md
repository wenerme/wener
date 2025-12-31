---
title: Linux Interrupts (IRQ)
tags:
  - Linux
  - Kernel
  - IRQ
  - Hardware
---

# Linux Interrupts (IRQ) {#linux-interrupts-irq}

- [Asterisk Guru: PCI, IRQ, APIC, TDM, Ticks, TE410P/TE405P, Noise](https://www.asteriskguru.com/tutorials/pci_irq_apic_tdm_ticks_te410p_te405p_noise.html)

## Concepts {#concepts}

- **Interrupt**: A method by which hardware communicates with the processor.
- **IRQ (Interrupt Request Line)**: A number used to describe an interrupt.
  - Typical PC has 16 IRQs (0-15).
  - Many are reserved (timer, keyboard, etc.).

### IRQ Assignment

| IRQ | Device                 | Note                                      |
| :-- | :--------------------- | :---------------------------------------- |
| 0   | timer                  | can't be changed                          |
| 1   | keyboard               | can't be changed                          |
| 2   | irq9 cascade           | can't be changed                          |
| 3   | com 2/4                |                                           |
| 4   | com 1/3                |                                           |
| 5   | usually free           |                                           |
| 6   | floppy disk            |                                           |
| 7   | lpt1                   |                                           |
| 8   | clock                  | can't be changed                          |
| 9   | usually free           | may be labelled as irq 2 due to cascading |
| 10  | free                   |                                           |
| 11  | free                   |                                           |
| 12  | mouse                  |                                           |
| 13  | co-processor           | can't be changed                          |
| 14  | Pri eide adapter       |                                           |
| 15  | secondary eide adapter |                                           |

### Controllers

- **APIC (Advanced Processor Interrupt Controller)**: Overcomes the 16 IRQ limit. Adds 24+ IRQs per APIC.
- **IO-APIC**
- **PCI-MSI**

## Debugging & Tuning {#debugging-tuning}

```bash
# Check IRQs
lspci -v | grep IRQ
# Bus-centric view
lspci -vb | grep IRQ
```

- **Troubleshooting Tips**:
  - Disable unused devices in BIOS (USB, Audio, etc.).
  - Assign IRQ to specific PCI slot in BIOS (if available).
  - Move card to different PCI slot.
  - Disable "Plug 'n Play OS" in BIOS.
  - Enable APIC in kernel.
  - Disable IRQ load balancing.

- `dahdi_test`: > 99.98% ok. < 99.975% problems.
- `dahdi_tool`: check IRQ misses.
- PCI Latency: min=0, max=248.

### SMP Affinity

```bash
# Check affinity
cat /proc/irq/16/smp_affinity

# Set affinity (e.g., CPU 2 or 2-3)
echo -n 2-3 > /proc/irq/16/smp_affinity_list
echo -n 2 > /proc/irq/16/smp_affinity
```

- [StackOverflow: SMP Affinity](https://stackoverflow.com/a/1500135/1870054)

## PRI & Signalling {#pri-signalling}

- [Asterisk Guru: PRI](https://www.asteriskguru.com/tutorials/pri.html)

- **T1** (NA/Japan): 23 B + 1 D.
- **E1** (Europe/Aus): 30 B + 1 D.
- **B-channel**: Voice/Data.
- **D-channel**: Signalling (Call setup/teardown).
- **CAS (Channel Associated Signalling)**: Bits replicate circuit status or tone signalling clearly.
- **CCS (Common Channel Signalling)**: ISDN/SS7. Messages sent over signalling channel.
